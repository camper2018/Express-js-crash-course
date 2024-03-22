const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');
// get all members
router.get('/', (req, res)=>res.json(members));
// get a single member
router.get('/:id', (req, res)=> {
   const id = req.params.id;
   const found = members.some(member => member.id === parseInt(id));
   if (found){
    res.json(members.filter(member => member.id === parseInt(id)));
   } else {
    res.status(400).json({msg: `No member with id of ${req.params.id}`})
   } 
})
// Create a member
router.post('/', (req, res) => {
  const payload = req.body;
  const newMember = {
    id : uuid.v4(),
    name: payload.name,
    email: payload.email,
    status: 'active'
  }
  if (!newMember.name || !newMember.email){
    return res.status(400).json({msg: "Please include a name and email"});
  } 
  members.push(newMember);
  // for sending data to frontend 
  res.json(members); 
  // for sending server-rendered views, redirect to the same route as of view page rendering form
  //   res.redirect('/') 
})
// update member
router.put('/:id', (req, res)=> {
    const id = req.params.id;
    const found = members.some(member => member.id === parseInt(id));
    if (found){
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(id)) {
                member.name = updMember.name ? updMember.name: member.name;
                member.email = updMember.email ? updMember.email: member.email;
                res.json({msg: "Member updated", member});
            } 
        }) 
    } else {
      res.status(400).json({msg: `No member with id of ${req.params.id}`});
    } 
 })
 // Delete member 
 router.delete('/:id', (req, res)=> {
    const id = req.params.id;
    const found = members.some(member => member.id === parseInt(id));
    if (found){
      res.json({msg: 'Member deleted', members:  members.filter(member => member.id !== parseInt(id))});
    } else {
     res.status(400).json({msg: `No member with id of ${req.params.id}`})
    } 
 })
module.exports = router;