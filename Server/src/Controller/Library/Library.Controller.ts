import {Available, ClassModel  ,LibModel ,StudentClasses ,TeacherAuth ,UserModel} from "@CampusLink/Server/Model"


async function handleshowbooks(req:any,res:any){
    
    try {
      const response= await LibModel.find({})
      res.json(response)
    } catch (error) {
      console.log(error)
    }
}
async function handleRecommendbooks(req:any, res:any) {
  const role = req.user.role;
  const userId = req.user.id;

  try {
      if (role == 'student') {
          const user:any = await UserModel.findById(userId); 
          const course =[ user.course]; 
          const subjects = await StudentClasses.find({ student: userId }).populate({
              path: 'classes.class',
              select: 'subj' // Exclude the _id field
          });

          const uniqueSubjects = new Set();
          subjects.forEach(subject => {
              subject.classes.forEach(clas => {
            // @ts-ignore
                  uniqueSubjects.add(clas?.class?.subj);
              });
          });
          course.push('G.K','Literature')
          res.json({subject:[...uniqueSubjects],course:course});
      } else if (role == 'teacher') {
          const subjects = await ClassModel.find({teacher_id:userId})
          const subject:string[]=[]
          const course:string[]=[]

        subjects.forEach(sub=>{
            subject.push(sub.subj as string)
            course.push(sub.course as string)
            course.push('G.K','Literature')
        })
        res.json({subject:subject,course:course})
      } else {
          res.status(400).json({ message: 'Invalid role' });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching subjects' });
  }
}


async function handleAskRequest(req:any, res:any) {
    const role = req.user.role;
    const { bookName, author } = req.body;

    try {
        if (role === "staff") {
            const response = await Available.create({
                name: "Staff",
                role: "Staff",
                email: 'Staff@gmail.com',
                bookName,
                author
            });
            return res.json({ message: 'Success' });
        }

        if (role === "student") {
            const id = req.user.id;
            const user = await UserModel.findOne({ _id: id });

            if (user) {
                const response = await Available.create({
                    name: user.firstName,
                    email: user.email,
                    bookName,
                    author,
                    course: user.course,
                    semester: user.semester,
                    role: 'Student'
                });
                return res.json({ message: 'Success' });
            }
        }

        if (role === "teacher") {
            const id = req.user.id;
            const user = await TeacherAuth.findOne({ _id: id });

            if (user) {
                const response = await Available.create({
                    name: user.firstName,
                    email: user.email,
                    bookName,
                    author,
                    role: 'Teacher'
                });
                return res.json({ message: 'Success' });
            }
        }

        // Handle cases where role is not recognized
        return res.status(400).json({ error: 'Role not recognized' });
    } catch (error) {
        console.error('Error handling ask request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleReqList(req:any, res:any) {
    try {
        const response = await Available.find({});
        res.json({ list: response });
    } catch (error) {
        console.error('Error fetching list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const handleAskedBooks = async (req:any, res:any) => {
    const email = req.user.email;

    try {
        const response = await Available.find({ email: email });

        if (response.length > 0) {
            res.json({ list: response });
        } else {
            res.json({ error: "No books have been requested by this user." });
        }
    } catch (error) {
        console.error("Error fetching requested books:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


async function handleChangeAvailable(req:any, res:any) {
    const { id, available } = req.body;

    try {
        // Update the availability status and set the note
        const response = await Available.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    available: available,
                    note: "It is available. Register the book from the library within two days"
                }
            },
            { new: true } // This option returns the modified document
        );

        // Check if the update was successful
        if (!response) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // If the status is set to available, set a timeout to delete the entry after 48 hours
        if (available) {
            setTimeout(async () => {
                try {
                    await Available.deleteOne({ _id: id });
                    console.log(`Entry with id ${id} deleted after 48 hours`);
                } catch (error) {
                    console.error('Error deleting entry after 48 hours:', error);
                }
            }, 48 * 60 * 60 * 1000); // 48 hours in milliseconds
        }

        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.error('Error updating availability:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export {handleshowbooks,handleRecommendbooks,handleAskRequest,handleReqList,handleAskedBooks,handleChangeAvailable}