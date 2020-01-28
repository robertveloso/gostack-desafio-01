const express = require("express")

const server = express()

server.use(express.json())

const projects = [] // empty array for store data.

/**
 * Middleware to count all request and display then.
 */
function logRequests(req, res, next) {
  console.count("Requests count:")

  return next()
}
server.use(logRequests)

function checkProjectExists(req, res, next) {
  const { id } = req.params
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "ID not found." })
  }

  return next()
}

server.get("/projects", (req, res) => {
  /**
   * Function: index
   * Description: lists all projects and tasks.
   */
  return res.json(projects)
})

server.get("/projects/:id", checkProjectExists, (req, res) => {
  /**
   * Function: show
   * Description: lists one project using the input ID.
   * Route params:
   *  -> id: string
   */
  const { id } = req.params
  const idx = projects.findIndex(p => p.id == id)
  return res.json(projects[idx])
})

server.post("/projects", (req, res) => {
  /**
   * Function: update
   * Description: adds a new project with a blank task.
   * Request body:
   *  -> id: string
   *  -> title: string
   */
  const { id, title } = req.body

  projects.push({ id, title, tasks: [] })

  return res.json(projects)
})

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  /**
   * Function: update
   * Description: adds new task to project using the input ID.
   * Route params:
   *  -> id: string
   * Request body:
   *  -> title:
   */
  const { id } = req.params
  const { title } = req.body
  const idx = projects.findIndex(p => p.id == id)
  // let project = undefined
  //if (projects[idx])
    const project = projects[idx].tasks.push(title)
  //else
    //return res.json("ID not found")

  return res.json(projects[idx])
})

server.put("/projects/:id", checkProjectExists, (req, res) => {
  /**
   * Function: update
   * Description: edits the project title using the input ID.
   * Route params:
   *  -> id: string
   * Request body:
   *  -> title:
   */
  const { id } = req.params
  const { title } = req.body
  const project = projects.find(p => p.id == id)

  project.title = title

  return res.json(project)
})

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  /**
   * Function: update
   * Description: excludes a project using the ID.
   * Route params:
   *  -> id: string
   */
  const { id } = req.params
  const idx = projects.findIndex(p => p.id == id)

  projects.splice(idx, 1)

  return res.json(projects)
})

server.listen(3000)
