const api_url = "https://api.github.com/repos";

export async function get_all_issues(key) {
  let issues_count = 0;
  let error = "";
  await fetch(`${api_url}/${key}?page=1&per_page=1`)
    .then(response => response.json())
    .then(issues => (issues_count = issues.open_issues_count))
    .catch(err => {
      console.log({ err });
      error = err.message;
    });

  return { issues_count, error };
}

export async function get_open_issues(key) {
  const { issues_count, error } = await get_all_issues(key);
  if (error) {
    return error;
  } else {
    let errorMsg = "";
    const pages = issues_count / 100;
    let lessThanOneDay = 0;
    let lessThanSevenDays = 0;
    let moreThanSevenDays = 0;
    let totalCount = 0;
    const todayTimeStamp = new Date().getTime();
    for (let i = 0; i < pages; i++) {
      let pageWiseIssue = [];
      await fetch(`${api_url}/${key}/issues?page=${i + 1}&per_page=100`)
        .then(res => res.json())
        .then(issues => (pageWiseIssue = issues));
      if (pageWiseIssue.length) {
        pageWiseIssue.map(issue => {
          if (!issue.pull_request) {
            totalCount += 1;
            let lastOpenedTimeStamp = new Date(issue.updated_at).getTime();
            const difference = todayTimeStamp - lastOpenedTimeStamp;
            const dayDifference = Math.floor(
              difference / (1000 * 60 * 60 * 24)
            );
            if (dayDifference <= 1) lessThanOneDay += 1;
            else if (dayDifference > 1 && dayDifference < 7)
              lessThanSevenDays += 1;
            else moreThanSevenDays += 1;
          }
        });
      } else {
        errorMsg = pageWiseIssue.message;
      }
    }
    return {
      totalCount,
      lessThanOneDay,
      lessThanSevenDays,
      moreThanSevenDays,
      error: errorMsg
    };
  }
}
