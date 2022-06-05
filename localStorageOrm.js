export class LocalStorageManager {
  constructor() {}

  /**
   * Creates a new "table" (array) on the Local Storage
   * @param {string} tableName
   */
  static addTable(tableName) {
    const doesTableAlreadyExists = Boolean(localStorage.getItem(tableName));

    if (doesTableAlreadyExists) {
      throw new Error("Table already exists!");
    }

    localStorage.setItem(tableName, []);

    return this;
  }

  /**
   * Drops a "table" (array) from the Local Storage
   * @param {string} tableName
   */
  static dropTable(tableName) {
    const tableDoesNotExist = !Boolean(localStorage.getItem(tableName));

    if (tableDoesNotExist) {
      throw new Error("Table does not exist!");
    }

    localStorage.removeItem(tableName);

    return this;
  }

  /**
   * Drops **ALL** "tables" from the Local Storage
   * @returns {LocalStorageManager}
   */
  static dropAllTables() {
    localStorage.clear();

    return this;
  }

  /**
   * Inserts an item on a given table
   * @param {string} tableName 
   * @param  {Array} items 
   */
  static insert(tableName, ...items) {
    const tableData = Array(JSON.parse(localStorage.getItem(tableName)));

    items.forEach((item) => {
      tableData.push(item);
    });

    localStorage.setItem(tableName, tableData);

    return this;
  }

  /**
   * Inserts an item on a given table
   * @param {string} tableName 
   */
  static getAll(tableName) {
    const data = Array(JSON.parse(localStorage.getItem(tableName)));

    return data;
  }

  /**
   * @param {string} tableName
   * @param {string} itemId
   */
  static getOneById(tableName, itemId) {
    const tableData = Array(JSON.parse(localStorage.getItem(tableName)));

    const data = tableData.find((tableItem) => tableItem.id === itemId);

    return data;
  }

  /**
   * Removes an item on a given table
   * @param {string} tableName 
   * @param  {Array} items 
   */
  static remove(tableName, ...items) {
    const tableData = Array(JSON.parse(localStorage.getItem(tableName)));

    items.forEach((item) => {
      const toRemoveItemIndex = tableData.indexOf(item);

      tableData.splice(toRemoveItemIndex, 1);
    });

    localStorage.setItem(tableName, tableData);

    return this;
  }

  /**
   * 
   * @param {string} tableName 
   * @param {string} itemId 
   */
  static removeById(tableName, itemId) {
    const tableData = Array(JSON.parse(localStorage.getItem(tableName)));

    const toRemoveItemIndex = tableData.findIndex((item) => item.id === itemId);

    if (toRemoveItemIndex === -1) {
      throw new Error("Item not found!");
    }

    tableData.splice(toRemoveItemIndex, 1);

    return this.addTable;
  }
}