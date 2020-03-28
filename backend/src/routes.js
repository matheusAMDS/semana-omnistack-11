const express = require("express")
const { celebrate, Segments, Joi } = require("celebrate")

const OngController = require("./controllers/OngController")
const IncidentController = require("./controllers/IncidentController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")

const routes = express.Router()

// POST /sessions
routes.post("/sessions", celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required().length(8)
  })
}), SessionController.create)

// GET /ongs
routes.get("/ongs", OngController.index)

// POST /ongs
routes.post("/ongs", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create)

// GET /incidents
routes.get("/incidents", celebrate({
  [Segments.QUERY]: Joi.object().keys({ page: Joi.number() })
}), IncidentController.index)

// POST /incidents
routes.post("/incidents", celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(8)
  }).unknown()
}), IncidentController.create)

// DELETE /incidents/:id
routes.delete("/incidents/:id", celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentController.delete)

// GET /profile
routes.get("/profile", celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.index)

module.exports = routes