const express = require("express")
const router = express.Router()
const Interview = require("../models/interview")

//Create
router.post("/", async(req, res)=>{
    try{
        const {candidate_name, position, status, email, notes} = req.body
        const interview =  await Interview.findOne({email})
        if(interview){
            return res.status(409).json({
            message: "The candidate is already in Database",
            success: false,
        })
    }
    const interviewModel = new Interview({
        candidate_name,
        position,
        status,
        email,
        notes
    })
    await interviewModel.save()
    res.status(201).json({ message: "Interview Saved Successfully.", success: true });
}catch (error) {
    res.status(400).json({ message: "Internal Server Error!", success: false, error:error.message });
  }
})

// Find by filter
router.get("/", async(req, res)=>{
try{
  const { candidate_name, status, position } = req.query;
  const filter = {};
  if (candidate_name) filter.candidate_name = candidate_name;
  if (status) filter.status = status;
  if (position) filter.position = position;

  const interviews = await Interview.find(filter);
  res.status(200).json({message: "Interviews fetched successfully.", success: true, data: interviews
  });
  
}catch(err){
    res.status(500).json({message: "Internal Server Error!", success: false})
}
})

// Update 
router.put("/:id", async(req, res)=>{
    try{
    const {id} = req.params
    await Interview.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json({ message: "Interview Updated Successfully.", success: true });
    }catch(err){
        res.status(400).json({message: "Internal Server Error!", success: false})
    }
})

// Delete

router.delete("/:id", async(req, res)=>{
    try{
        const {id} = req.params
        await Interview.findByIdAndDelete(id);
        res.status(200).json({ message: "Interview Deleted Successfully.", success: true });
        }catch(err){
            res.status(400).json({message: "Internal Server Error!", success: false})
        }
})

module.exports = router