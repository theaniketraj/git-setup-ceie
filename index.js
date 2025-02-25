const { exec } = require('child_process');

function createAndPushBranches() {
  const branches = ['main', 'ce', 'ie'];

  branches.forEach((branch) => {
    // Create the branch
    exec(`git checkout -b ${branch}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating branch ${branch}: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`Successfully created branch ${branch}`);

      // Make an empty initial commit if the branch is new
      exec('git commit --allow-empty -m "Initial commit"', (commitError, commitStdout, commitStderr) => {
        if (commitError) {
          console.error(`Error making initial commit for ${branch}: ${commitError}`);
          return;
        }
        if (commitStderr) {
          console.error(`stderr: ${commitStderr}`);
          return;
        }
        console.log(`Successfully made initial commit for ${branch}`);

        // Push the branch to GitHub
        exec(`git push -u origin ${branch}`, (pushError, pushStdout, pushStderr) => {
          if (pushError) {
            console.error(`Error pushing branch ${branch}: ${pushError}`);
            return;
          }
          if (pushStderr) {
            console.error(`stderr: ${pushStderr}`);
            return;
          }
          console.log(`Successfully pushed branch ${branch} to GitHub`);
        });
      });
    });
  });
}

createAndPushBranches();
