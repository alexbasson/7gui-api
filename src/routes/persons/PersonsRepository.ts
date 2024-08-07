export type Person = {
  id: number,
  name: string,
  surname: string,
}

export class PersonsRepository {
  private persons: Person[] = []
  private id: number = 1

  getAll(): Person[] {
    return this.persons
  }

  create(name: string, surname: string): Person {
    const person: Person = { id: this.id++, name, surname }
    this.persons.push(person)
    return person
  }

  update(id: number, name: string, surname: string): Person {
    const person: Person = { id, name, surname }
    this.persons.splice(this.indexOf(id), 1, person)
    return person
  }

  delete(id: number) {
    this.persons.splice(this.indexOf(id), 1)
  }

  private indexOf(id: number): number {
    return this.persons.findIndex(person => person.id === id)
  }
}
