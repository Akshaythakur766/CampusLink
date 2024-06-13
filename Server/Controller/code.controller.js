const CodeModel = require('../model/Code');
const Teacher=require('../model/teacherauth')
async function handleCodeList(req, res) {
    try {
        const response = await CodeModel.find({});
        res.json({ data: response });
    } catch (error) {
        console.error('Error fetching code list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleAddCode(req, res) {
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

async function handleTeacherList(req,res){
    const response=await Teacher.find({})
    res.json({list:response})
}

module.exports = { handleAddCode, handleCodeList,handleTeacherList };
