import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Button, IconButton, Input } from '@material-tailwind/react'
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react'



function App() {
  let [searchInput, setSearchInput] = useState('');

  let [data, setData] = useState([]);
  const [movieData, setMovieDesc] = useState([]);


  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    
    searchInput = e.target.value;

  }

  const onSubmit = (e:  FormEvent) =>  {

    e.preventDefault();

    let apiData = {
      apikey : `${process.env.REACT_APP_OMDB_API_KEY}`,
      s : searchInput,
    };

    axios.get(`${process.env.REACT_APP_OMDB_API_URL}`, {
      params: apiData
    })
    .then(result => {
      setData(result.data.Search);
    })
    .catch(err => {
      console.log(err)
    })

    
  }


  const movieDetailDisplayer = (title: string) => {

    let apiData = {
      apikey : `${process.env.REACT_APP_OMDB_API_KEY}`,
      t : title,
    };
    axios.get(`${process.env.REACT_APP_OMDB_API_URL}`, {
      params: apiData
    })
    .then(result => {
      setMovieDesc(result.data)
    })
    .catch(err => {
      console.log(`Error occurred - ${err}`)
    })
  }

  useEffect( () =>{
    setMovieDesc(movieData)
    setData(data)
  } , []);


  return (
    <div className="App">
      <div>
      <div className="md:w-4/5 mx-auto md:p-8 p-5 md:grid grid-cols-12">
        <div className="col-span-9">
            <h2 className='text-4xl'>
                Wecome to <span className='text-blue-600'>JeansEdward</span>
            </h2>
        </div>

        <div className="col-span-3">
            <form action="" method="post" className='flex justify-start' onSubmit={(e)=> {onSubmit(e)}}>
                <Input crossOrigin="" required variant='outlined' onChange={onChange}  className='relative -z-0' label='Search seasonal, series & movies' type='search' />
                <Button type='submit'>Search</Button>
            </form>
        </div>
      </div>

     
    </div>
      <div className="md:grid w-4/5 mx-auto md:p-10 grid-cols-12 gap-0 p-6">
          <div className="col-span-7">
            <h2 className='text-lg font-semibold md:text-3xl'> Detailed Movie Description </h2>
              <div className="">
                {
                  Object.values(movieData).map( (movieDetail, index) => {
                    return (
                      <div key={index}>{movieDetail['Plot']}</div>
                    )
                  })
                }
              </div>
          </div>
          <div className="col-span-5">
              <div className="md:block ">
                  <div className="movie-list bg-gray-200 ">
                      <div className="mb-5 px-5 py-2">
                          <h2 className='text-lg font-semibold text-gray-900'>Search Result</h2>
                      </div>
                  </div>

                  <div className="">
                  {
                    data.map( (dataResponse, index) => {
                      return (
                        <div onClick={() => movieDetailDisplayer(dataResponse['Title'])} key={index} className="md:grid hover:cursor-pointer bg-blue-gray-100/20 hover:bg-blue-gray-100 transition-colors mb-12 grid-cols-12 gap-0">
                            <div className="col-span-3 rounded-lg shadow-sm">
                          <video src="" width={120} poster={dataResponse['Poster']}></video>
                          </div>
                          <div className="col-span-7 mt-5">
                              <h3 className="title text-lg">{dataResponse['Title']}</h3>
                              <p className='text-sm mt-2'>
                                  Released Date: {dataResponse['Year']}
                              </p>
                              <div className="flex justify-start gap-6">
                                  <p>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                      </svg>
                                  </p>
                                  <p>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
                                          <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
                                      </svg>
                                  </p>
                              </div>
                          </div>
                        </div>
                      )
                    })
                  }
                      
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
