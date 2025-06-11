const express = require('express')
const router = express.Router()
const {roomModel} = require('./schema');

router.post('/saveroominfo', async (req,res)=>{
    const data = req.body
    if (!data) {
        res.status(400).json({massage:'someting went worng in data'})
    }

    try {
        const modelData = new roomModel(data)
        await modelData.save()
        console.log("data saved in server")
        res.status(200).send(true)
    } catch (error) {
        res.status(500).json({massage:"someting want worg while saveing data"})
    }
})


router.post('/joininroom', async (req,res)=>{
    try{
        
        const {id} = req.body
        const roomcheack = await roomModel.findOne({id:id})
        // console.log("join room chek after find")

        if (!roomcheack) {
            console.log("requst not found")
            return res.status(401).json({ success: false });
        }
        if (roomcheack) {
            console.log('requst found')
            return res.status(200).json({ success: true });           
        }

        // if (data.lock === false) {
        //     return res.status(200).json({massage:"allow user"})
        // }

        // if (data.lock === true) {
        //     return res.status(401).json({massage:"room locaked"})
        // }

        
    } catch(error){
         res.status(500).json({massage:"someting want worg while joining room"})
    }
})

router.post('/deleteroom',async(req,res)=>{
    try {
        const { id } = req.body

        if (!id) {
            console.log("id not found in delete request")
            return res.status(400).json({massage: "something want wprng in the delete requst id"})
        }

        const result = await roomModel.deleteOne({id:id})

        if (result) {            
            return res.status(200).json({success:true})
        }else{
            return res.status(404).json({success:false})
        }

    } catch (error) {
         res.status(500).json({massage:"someting want worg while joining room"})
    }
})


module.exports = { router }