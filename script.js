function generatePasswords() {
  const user = document.getElementById("wordInput").value.trim();
  const dob = document.getElementById("dobInput").value; // yyyy-mm-dd
  const output = document.getElementById("output");

  if (!user || !dob) {
    output.innerText = "⚠️ Enter both Name and DOB!";
    return;
  }

  let [year, month, day] = dob.split("-");
  const shortYear = year.slice(2);

  let formats = [
    "user123", "123user", "user@123", "123@user", 
    "user_year", "year_user",
    "userdaymonthshortYear", 
    "daymonthshortYearuser",
    "user@day", "@usermonth",
    "!user!shortYear",
    "USER@year",
    "user_daymonth", 
    "monthday_user",
    "user#hacker", "hacker#user",
    "user007", "root_user",
    "adminuser", "useradmin"
  ];

  let generatedList = [];

  // Expand to 200 variations
  for (let i = 0; i < 200; i++) {
    let base = formats[i % formats.length];
    let variation = base
      .replace(/user/g, user)
      .replace(/day/g, day)
      .replace(/month/g, month)
      .replace(/year/g, year)
      .replace(/shortYear/g, shortYear);

    // Add random spice
    if (i % 5 === 0) variation += "!";
    if (i % 7 === 0) variation = variation.toUpperCase();
    if (i % 9 === 0) variation += Math.floor(Math.random() * 999);

    generatedList.push(variation);
  }

  output.innerText = generatedList.join(" , ");
}

function downloadPasswords() {
  const text = document.getElementById("output").innerText;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "passwords.txt";
  link.click();
}
