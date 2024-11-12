import { useEffect } from 'react'
import './App.css'
import { useList } from './store/uselist'
import { url } from './config/config'

function App() {
  let {data,getUsers,deleteUser,setName,name,idx,setIdx,modalEdit}=useList()
  useEffect(()=>{
    getUsers()
  },[])

  const handleEdit = async () => {
    try {
      const obj = { id: idx, name };
      await putUser(obj);
      setModalEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <> 
   {modalEdit && (
        <dialog open>
          <h2>Edit User</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
          />
          <button
            onClick={handleEdit}
          >
            Submit
          </button>
        </dialog>
      )}
    {data.map((el,i)=>{
      return <div style={{width:"200px"}} key={i}>
        <h1>{el.name}</h1>
        <h2>{el.description}</h2>
        {el?.images?.map((elem,i)=>{
          return <>
          <img
          width={"200px"}
                  src={`${url}/images/${elem.imageName}`}
                  alt={elem.imageName}
          />
          </>
        })}
        <button>Edit</button>
        <button onClick={()=>{
         deleteUser(el.id)
        }}>Delete</button>
      </div>
    })}
    </>
  )
}

export default App
