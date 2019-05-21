const api_url = "https://api.github.com/repos";

export async function get_all_issues(key) {
  let issues_count = 0;
  await fetch(`${api_url}/${key}?page=1&per_page=1`)
    .then(response => response.json())
    .then(issues => (issues_count = issues.open_issues_count))
    .catch(err => console.log({ err }));

  return issues_count;
}

// export async function get_open_issues(key) {
//   let pull_requests = 0;
//   await fetch(`${api_url}/${key}/pulls?state=open&per_page=100&page=100`)
//     .then(res => res.json())
//     .then(pulls => (pull_requests = pulls.length))
//     .catch(err => console.log({ err }));
//   const all_issues = get_all_issues(key);
//   console.log({ all_issues, pull_requests });
//   return all_issues - pull_requests;
// }

export async function get_issues_before_n_days(n, key) {
  const date = JSON.stringify(new Date(Date.now() - 24 * n * 60 * 60 * 1000));
  console.log({ date });
  let issues_count = 0;
  await fetch(`${api_url}/${key}/issues?since=${date}&page=1&per_page=9999`)
    .then(res => res.json())
    .then(issues => (issues_count = issues.length))
    .catch(err => console.log({ err }));
  return issues_count;
}
