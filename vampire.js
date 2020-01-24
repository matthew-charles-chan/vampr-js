class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;



  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVamp = this;

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfVampires ++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVamp = this;
    if (currentVamp.creator === null) {
      return currentVamp;
    } else if (vampire.creator === null) {
      return vampire.creator;
    } else if (vampire.name === currentVamp.name) {
      return currentVamp;
    }
    if (vampire === this.creator) {
      return vampire;
    } else if (this === vampire.creator) {
      return this;
    }
    while (currentVamp.creator !== vampire.creator) {
      if (currentVamp.isMoreSeniorThan(vampire)) {
        vampire = vampire.creator;
      } else {
        currentVamp = currentVamp.creator;
      }
    }
    return currentVamp.creator;
  }
}

module.exports = Vampire;

