var execShPromise = require("exec-sh").promise;

const projects = [
  { name: "ISIS3710_202310_S1_E1_Back.wiki"},
];

const createRepos = async () => {
  let out;

  try {
    for (const project of projects) {
      let command = `git remote rm origin &
      git remote add origin git@github.com:isis3710-uniandes/${project.name}.git &
      git pull -s ours origin master --allow-unrelated-histories &
      git push origin master`;

      out = await execShPromise(command, true);
    }
  } catch (e) {
    console.log("Error: ", e);
    console.log("Stderr: ", e.stderr);
    console.log("Stdout: ", e.stdout);
    return e;
  }

  console.log("out: ", out.stdout, out.stderr);
};

createRepos();