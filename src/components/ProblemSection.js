import React, { Component } from 'react'
import { Grid, Statistic, Table } from 'semantic-ui-react';

export default class ProblemSection extends Component {
  render() {
    const { problems } = this.props;
    return (
      <Grid stackable columns={2}>
        <Grid.Column width={4}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ padding: 10 }}>
              <Statistic color='green'>
                <Statistic.Value>{problems.solved.size}</Statistic.Value>
                <Statistic.Label>Problems Solved</Statistic.Label>
              </Statistic>
            </div>
            <div style={{ padding: 10 }}>
              <Statistic>
                <Statistic.Value>{Object.keys(problems.attempted).length}</Statistic.Value>
                <Statistic.Label>Problems Attempted</Statistic.Label>
              </Statistic>
            </div>
          </div>
          {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Rating site='cf' rating={rating} label='Current Rating' />
            <Rating site='cf' rating={maxRating} label='Max Rating' />
          </div> */}
        </Grid.Column>
        <Grid.Column width={12} stretched>
          <div style={{ height: 200, overflowY: 'scroll' }}>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Solved</Table.HeaderCell>
                  <Table.HeaderCell>Problem</Table.HeaderCell>
                  <Table.HeaderCell>Attempts</Table.HeaderCell>
                </Table.Row>
                {Object.keys(problems.attempted).map(key => {
                  const problem = problems.attempted[key];
                  return (
                    <Table.Row>
                      <Table.Cell style={{ color: problem.solved ? 'green' : 'red' }}>
                        {problem.solved ? 'Y' : 'N'}
                      </Table.Cell>
                      <Table.Cell><a href={`http://codeforces.com/problemset/problem/${key}`}>{problem.name}</a></Table.Cell>
                      <Table.Cell>{problem.tries}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Header>
            </Table>
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}