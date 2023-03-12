import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // const file = path.join(process.cwd(), 'files', 'test.json');

  if(req.method == 'POST') {
    try {
      fs.mkdirSync(`./pages/${req.body.filename}`)
      fs.writeFileSync(`${process.cwd()}/pages/${req.body.filename}/index.js`, 
          `
          import {useEffect} from 'react';
          import Head from 'next/head'
          import TableData from "../../components/TableData";
          import {useSelector,useDispatch} from 'react-redux';
          import {${req.body.sliceFunctionName}} from "../../redux/${req.body.filename}/${req.body.filename}Slice.js";
    
          export default function Index() {
    
            const data = useSelector((state) => state.${req.body.data}) 
            const user = useSelector((state) => state.users) 
            let dispatch = useDispatch();
            
            let apiObject = ${req.body.query};
    
            useEffect(() => {
              dispatch(${req.body.sliceFunctionName}(apiObject))
            }, [user.boardCode,user.agency])
    
    
            return (
              <div>
                <Head>
                  <title>${req.body.title}</title>
                  <meta name="description" content="${req.body.description}" />
                </Head>
                <div className="count-card">
                  <div className="card mt-3">
                    <div className="card-body">
                        <h2>${req.body.tableHeading}</h2>
                        <TableData 
                            data={data} 
                            filters={{}}
                            paginate={${req.body.pagination == 'true' ? true : 'false' ? false : false}}
                        />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
    
          `
      )
    
      fs.mkdirSync(`./redux/${req.body.filename}`)
      fs.writeFileSync(`${process.cwd()}/redux/${req.body.filename}/${req.body.filename}Slice.js`,
          `
          import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
          import axios from 'axios';

          export const ${req.body.sliceFunctionName} = createAsyncThunk("${req.body.slicePathPrefix}/${req.body.slicePathName}", 
            async (payload, {getState}) => {
                  let {users} = getState();
                    return await axios.${req.body.method}(${req.body.apiUrl})
                    .then(res => {
                        try{
                            return {data:res.data.entries}
                        }catch(e){ 
                            return {data:[]}
                        }
                    })
              }
            )

            export const ${req.body.filename}Slice = createSlice({
              name: "${req.body.sliceName}",
              initialState: {
                    loading: true,
                    error: false,
                    data: [],
              },
              extraReducers: {
                [${req.body.sliceFunctionName}.pending]: (state) => {
                        state.loading = true
                        state.error = false
                },
                [${req.body.sliceFunctionName}.fulfilled]: (state, action) => {
                        state.loading = false
                        state.error = false
                        state.data = action.payload.data
                },
                [${req.body.sliceFunctionName}.rejected]: (state) => {
                  state.loading = false
                        state.error = true
                },
              }
              
            });

            export default ${req.body.filename}Slice.reducer;
    
          `
      )

      const people = fs.readFileSync("./redux/store.js", "utf-8").split('\n');
      const position = people.length - 12;
      people.splice(position - 1, 0, `${req.body.data}:${req.body.filename}Reducer,`)
      people.splice(2 - 1, 0, `import ${req.body.filename}Reducer from "./${req.body.filename}/${req.body.filename}Slice";`)
      const newData = people.join('\n')
      fs.writeFileSync("./redux/store.js", newData, {encoding: 'utf-8'});
      res.setHeader('Content-Type', 'application/json');
      return res.send({status:true,msg:"Page created Successfully"});
    }catch(err) {
      return res.send({status:false,msg:JSON.stringify(err)})
    }
    
  }
  
}