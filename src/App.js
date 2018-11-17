import React, { Component } from 'react';
import request from 'request';

import './App.css';
import UsernameEntry from './components/UsernameEntry';
import CodeforcesPage from './components/CodeforcesPage';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleSubmit = ({ cfHandle, dmojHandle }) => {
    this.setState({cfHandle, dmojHandle});
    // request.get('https://dmoj.ca/api/user/info/' + dmojHandle, (err, res, body) => {
    //   const data = JSON.parse(body);
    //   console.log(data)
    // });
    request('http://codeforces.com/api/user.rating?handle=' + cfHandle, (err, res, body) => {
      const data = JSON.parse(body);
      if (data.status === "OK") {
        const ratings = data.result.reduce((arr, item) => {
          arr.push({ date: new Date(item.ratingUpdateTimeSeconds * 1000), rating: item.newRating })
          return arr;
        }, []);
        this.setState({ ratings });
      }
    });
    request('http://codeforces.com/api/user.info?handles=' + cfHandle, (err, res, body) => {
      const data = JSON.parse(body);
      if (data.status === 'OK') {
        this.setState({ userInfo: data.result[0] });
      }
    })
    request('http://codeforces.com/api/user.status?handle=' + cfHandle, (err, res, body) => {
      const data = JSON.parse(body);
      if (data.status === 'OK') {
        const attempted = {};
        const solved = new Set();
        const tags = data.result.reduce((acc, submission) => {
          const problemId = `${submission.problem.contestId}/${submission.problem.index}`;
          if (!Object.hasOwnProperty.call(attempted, problemId)) {
            attempted[problemId] = {
              name: `${submission.problem.contestId}${submission.problem.index} ${submission.problem.name}`,
              tries: 1,
              solved: false,
            }
          } else {
            attempted[problemId].tries ++;
          }
          if (submission.testset === 'TESTS' && submission.verdict === 'OK') {
            if (!solved.has(problemId)) {
              solved.add(problemId);

              attempted[problemId].solved = true;

              submission.problem.tags.forEach(tag => {
                if (!Object.hasOwnProperty.call(acc, tag)) {
                  acc[tag] = 0;
                }
                acc[tag] ++;
              })
            }
          } 
          return acc;
        }, {});
        this.setState({ problems: { attempted, solved, tags } });
      }
    })
  }
  render() {
    const { ratings, userInfo, problems } = this.state;
    return (
      <div className="App" style={{ width: '80%', paddingTop: 10, margin: '0px auto 0px auto' }}>
        <UsernameEntry handleSubmit={this.handleSubmit} />
        {problems && ratings && userInfo ? 
        <CodeforcesPage
          ratings={ratings}
          userInfo={userInfo}
          problems={problems}
        /> : null}
      </div>
    );
  }
}

export default App;
