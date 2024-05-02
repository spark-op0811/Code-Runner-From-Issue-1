const fs = require("fs");
const execSync = require('child_process').execSync;

let username = fs.readFileSync('name.txt', 'utf8').trim();

if (username == "happy-spark" || username == "daniel081139") {
 fs.writeFileSync("script.py", process.env.PYTHON_CODE);

try {
    execSync(`echo "${process.env.PYTHON_CODE}" >> $GITHUB_STEP_SUMMARY`);
} catch (error) {
    execSync(`echo "작업 요약에 Python 코드를 저장하는 과정에서 에러가 발생하였습니다." >> $GITHUB_STEP_SUMMARY`);
    execSync(`echo "${error.stderr}" >> $GITHUB_STEP_SUMMARY`);
}

let python_output;
try {
    python_output = execSync("python script.py");
} catch (error) {
    python_output = error.stderr;
}

fs.writeFileSync("output.txt", python_output);
}else{
  fs.writeFileSync("output.txt", "죄송합니다. 코드를 실행할 권한이 없습니다.\nsorry. You do not have permission to run the code.");
}
