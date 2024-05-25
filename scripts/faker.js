const { faker } = require("@faker-js/faker")
const path = require("path")
const fs = require("fs")

const createUser = () => {
  const sex = faker.person.sexType()
  const firstName = faker.person.firstName(sex)
  const lastName = faker.person.lastName()
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ])
  return {
    firstName,
    lastName,
    email,
    id: faker.string.uuid(),
    birthday: faker.date.birthdate(),
    plan: faker.helpers.arrayElement(["free", "pro", "premium"]),
    projects: faker.number.int({ min: 0, max: 10 }),
    dateCreated: faker.date.past({ years: 10 }),
    dateUpdated: faker.date.recent({ days: 10 }),
  }
}

console.log(createUser())
const users = Array.from({ length: 100 }, createUser)
fs.writeFileSync(
  path.resolve(__dirname, "../fixtures/data.json"),
  JSON.stringify(users, null, 2)
)
