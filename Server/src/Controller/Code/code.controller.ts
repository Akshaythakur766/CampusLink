import {TeacherAuth , CodeModel} from "@CampusLink/Server/Model"
async function handleCodeList(req:any, res:any) {
    try {
        const response = await CodeModel.find({});
        res.json({ data: response });
    } catch (error) {
        console.error('Error fetching code list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleAddCode(req:any, res:any) {
    const { code, name, email, role } = req.body;

    try {
        
            const entry = await CodeModel.create({
                name: name,
                email: email,
                role: role,
                code: code
            });
            res.json({ success: "Code added successfully"  });
        
    } catch (error) {
        console.error('Error adding code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleTeacherList(req:any,res:any){
    const response=await TeacherAuth.find({})
    res.json({list:response})
}

export { handleAddCode, handleCodeList,handleTeacherList };
