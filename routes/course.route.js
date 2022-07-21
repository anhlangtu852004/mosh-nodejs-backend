const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  {
    id: 1,
    name: "course1",
  },
  {
    id: 2,
    name: "course2",
  },
  {
    id: 3,
    name: "course3",
  },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("id course khon ghoop le");
    return;
  }
  res.send(course);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("id course khon ghoop le");
    return;
  }

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(courses);
});

router.delete("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("id course khon ghoop le");
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(bodyRequest) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(bodyRequest);
}

module.exports = router;
