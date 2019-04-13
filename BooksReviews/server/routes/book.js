const express = require("express");
const authCheck = require("../middleware/auth-check");
const usernameCheck = require("../middleware/username-check");
const Book = require("../models/Book");
const Comment = require("../models/Comment");

const router = new express.Router();

function validateBookForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  if (
    !payload ||
    typeof payload.title !== "string" ||
    payload.title.length < 3
  ) {
    isFormValid = false;
    errors.title = "Make must be more than 3 symbols.";
  }

  if (
    !payload ||
    typeof payload.content !== "string" ||
    payload.content.length < 30
  ) {
    isFormValid = false;
    errors.content = "Content must be more than 30 symbols.";
  }

  if (
    !payload ||
    typeof payload.genre !== "string" ||
    payload.content.length < 1
  ) {
    isFormValid = false;
    errors.genre = "Enter a valid genre.";
  }

  if (
    !payload ||
    !(
      typeof payload.image === "string" &&
      payload.image.startsWith("http") &&
      (payload.image.endsWith(".jpg") || payload.image.endsWith(".png"))
    )
  ) {
    isFormValid = false;
    errors.image = "Enter a valid image URL.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post("/create", authCheck, (req, res) => {
  const book = req.body;
  book.creator = req.user._id;
  const validationResult = validateBookForm(book);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  Book.create(book).then(book => {
    res.status(200).json({
      success: true,
      message: "Book added successfully.",
      book
    });
  });
});

router.get("/:category", (req, res) => {
  const category =
    req.params.category === "all" ? {} : { category: req.params.category };
  // const page = parseInt(req.query.page) || 1;
  // const search = req.query.search;

  Book.find(category)
    // .skip((page-1) * 10)
    // .limit(10)
    .then(books => {
      if (!books) {
        return res.status(404).json({
          success: false,
          message: "No books to show!"
        });
      }
      return res.status(200).json(books);
    });
});

router.get("/details/:id", (req, res) => {
  const id = req.params.id;
  Book.findById(id)
    .populate({ path: 'comments', model: Comment })
    .then(book => {
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Entry does not exists!"
        });
      }

      res.status(200).json(book);
    });
});

router.get("/myPosts", authCheck, (req, res) => {
  const user = req.user._id;
  const page = parseInt(req.query.page) || 1;

  Book.find({ creator: user })
    // .skip((page-1) * 10)
    // .limit(10)
    .then(books => {
      return res.status(200).json(books);
    });
});

router.delete("/delete/:id", authCheck, (req, res) => {
  const id = req.params.id;
  const user = req.user._id;

  Book.findById(id).then(book => {
    if (!book) {
      return res.status(200).json({
        success: false,
        message: "Book does not exists!"
      });
    }

    if (book.creator.toString() != user && !req.user.roles.includes("Admin")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized!"
      });
    }

    Comment.deleteMany({ book: id }).then(() => {
      Book.findByIdAndDelete(id).then(() => {
        return res.status(200).json({
          success: true,
          message: "Book deleted successfully!"
        });
      });
    });
  });
});

router.put("/edit/:id", authCheck, async (req, res) => {
  const id = req.params.id;
  const book = req.body;
  const user = req.user._id;

  try {
    const bookToEdit = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book does not exists!"
      });
    }

    if (
      bookToEdit.creator.toString() != user &&
      !req.user.roles.includes("Admin")
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized!"
      });
    }

    const validationResult = validateBookForm(book);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    Book.findByIdAndUpdate(id, book).then(() => {
      return res.status(200).json({
        success: true,
        message: "Book edited successfully!"
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/details/:id/comment/create', usernameCheck, async (req, res) => {
  const id = req.params.id;
  const user = req.username;
  const { content } = req.body;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book does not exists!"
      });
    }

    const comment = await Comment.create({ content, creator: user, book: id });

    book.comments.push(comment._id);
    book.save().then(() => {
      return res.status(200).json({
        success: true,
        message: "Comment added successfully!"
      });
    });
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
