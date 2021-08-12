const Bookmark = require('../models/bookmark');
const router = require('express').Router();


//Create Route /bookmarks - POST
router.post('/', async (req, res)=> {
  try{
    const createdBookmark = await Bookmark.create(req.body) // <--- what?! is this the api? what is this? how would we know what this is?
    res.status(200).json(createdBookmark)
  }catch(error) {
    console.error(error) // <--- for the backend developer
    res.status(400).json({
      message: error.message // <--- for the frontend developer
    })
  }
})


//Read Route: Index and Show

//Index Route /bookmarks - GET


router.get('/', async (req, res) => {
  try {
    const foundBookmarks = await Bookmark.find({})
      res.status(200).json(foundBookmarks)
      } catch (error) {
        console.error(error)
        res.status(404).json({
            message: error.message
        })
  }
})

//Show Route /booksmarks/:id - SHOW //should it just be "/:id"? Like in blog?

router.get('/:id', async (req, res) => {
  try {
    const foundBookmark = await Bookmark.findById(req.params.id)
      res.status(200).json(foundBookmark)
      } catch (error) {
        console.error(error)
        res.status(404).json({
            message: error.message
      })
  }
})

//Update Route /booksmarks/:id - PUT

router.put('/:id', async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {new: true})
      res.status(200).json(updatedBookmark)
  } catch(error) {
    console.error(error)
    res.status(404).json({
      message: error.message
    })
  }
})

//Destroy Route /booksmarks/:id - DELETE

router.delete('/:id', async (req, res) => {
  try{
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedBookmark)
  } catch(error) {
    console.error(error)
    res.status(404).json({
      message: error.message
    })
  }
})
module.exports = router;
