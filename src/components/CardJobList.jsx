import React from 'react'
import CardJob from './CardJob';
import { SearchBox } from './SearchBox';

const CardJobList = () => {

  const [jobs, setJobs] = React.useState([]);
  const [searchField, setSearchField] = React.useState('');

  React.useEffect(() => {

    async function fetchJob(url) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setJobs(json);
      } catch (error) {
        console.error("error");
      }
    }
    fetchJob('https://jobs.github.com/positions.json')
    console.log(jobs)
  }, []) 


  const filteredJobs = jobs.filter( job => job.title.toLowerCase().includes(searchField.toLowerCase()));

  return (
    <div>

      <SearchBox 
        placeholder='cerca job'
        // handleChange={ e => setSearchField({ searchField: e.target.value})}
        handleChange={ e => setSearchField(e.target.value)}
      />
      

      {filteredJobs.map( job => (
        <CardJob key={job.id} title={job.title} description={job.description}/>
      ))}

    </div>
  )
}

export default CardJobList
