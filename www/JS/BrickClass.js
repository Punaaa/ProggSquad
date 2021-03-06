/**
 * Brick classs
 */
class Brick {
  constructor(health, color, id, killedCallback, brickDemensions, brickRowIndex){
    this._id = id;
    this._totalHealth = health;
    this._health = health;
    this._color = color;
    this.killedCallback = killedCallback;
    this._brickDimensions = brickDemensions;
    this._brickCords = { left: null, right: null, top: null, bottom: null };
    this._worth = 20;

    this._brick = this.createBrick(brickRowIndex);
  };

  /**
   * Sets background color
   * @param {String} color
   */
  set color(color) {
    this._color = color;
  };

  /**
   * Returns background color
   * @returns {String}
   */
  get color () {
    return this._color;
  };

  /**
   * Sets brick health
   * @param {Number} health
   */
  set health(health) {
    this._health = health;
  };

  /**
   * Returns brick health
   * @returns {Number}
   */
  get health() {
    return this._health;
  };

  /**
   * Returns brick HTML element
   * @returns {*}
   */
  get brick() {
    return this._brick;
  }

  /**
   * Returns opacity value for brick
   * @returns {number}
   */
  getDamageColor() {
    return this.health / this._totalHealth;
  };

  /**
   * Adds damage and updates appearance accordingly
   * @param dmg
   */
  registerDamage(dmg) {
    this.health = this.health - dmg;

    this.brick.style.opacity = this.getDamageColor();
    this.brick.innerHTML = this.health;
    this.isDead();
  };

  /**
   * Creates a Brick HTML element
   */
  createBrick(brickRowIndex) {
    const brickElement = createElement('div', ['brick']);

    brickElement.innerHTML = this.health;
    brickElement.style.backgroundColor = this.color;
    brickElement.style.left = (Math.ceil(this._brickDimensions.width) * brickRowIndex).toString() + 'px';

    return brickElement;
  };

  setBrickCords(){
    this._brickCords = this.brick.getBoundingClientRect();
    console.log(this._brickCords);
  }

  /**
   * If brick is dead, runs provided callback
   */
  isDead() {
    if (this.health < 1) {
      this.killedCallback(this._id);
    }
  };

  /**
   * Destroys the brick and removes it from the DOM
   */
  destroy() {
    this.brick.parentNode.removeChild(this.brick);
  };
}


