const store = require("./store");

const addUser = async (name) => {
  const users = await store.list();

  if (!name) {
    return promise.reject("los datos son incorrectos");
  }

  const user = {
    name: name,
  };

  const equal = users.filter((us) => {
    return us.name === user.name;
  });

  if (equal.length > 0) {
    return equal[0];
  } else {
    return store.add(user);
  }
};

const getUsers = () => {
  return store.list();
};

module.exports = {
  addUser,
  getUsers,
};
