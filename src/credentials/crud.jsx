import { useEffect, useState } from 'react'
import './crud.css'

function Crud() {
    const [datas, setDatas] = useState([]);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newWebsite, setNewWebsite] = useState("");

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((details) => setDatas(details))
    }, [])
    function adduser() {
        const name = newName.trim();
        const email = newEmail.trim();
        const website = newWebsite.trim();
        if (name && email && website) {
            fetch('https://jsonplaceholder.typicode.com/users',
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        email,
                        website
                    }),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8 "
                    }
                }
            ).then((response) => response.json())
                .then(e => {
                    setDatas([...datas, e])
                })
            setNewName("");
            setNewEmail("");
            setNewWebsite("");
        }
    }
    function updatechanges(id, key, value) {
        return setDatas((datas) => {
            return datas.map((vals) => {
                datas.id === id ? { ...vals, [key]: value } : vals
            })
        })
    }
    function update(id) {
        const datss = datas.find((datas) => datas.id === id)
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(datas),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8 "
                }
            }
        ).then((response) => response.json())

    }
    function deletingdatas(id) {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
            {
                method: "DELETE",
            }

        ).then((response) => response.json())
            .then(e => {
                return setDatas((datas) => {
                    return datas.filter((datas) => datas.id !== id)
                })
            })


    }

    return (
        <>
            <header>
                Fake Api Request Project From <a href='https://jsonplaceholder.typicode.com/users'>'https://jsonplaceholder.typicode.com/users'</a> url
            </header>
            <table>
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Action</th>
                </thead>
                {datas.map(user =>
                    <tr key={user.id}>
                        <td >{user.id}</td>
                        <td contentEditable onChange={(value => updatechanges(user.id, 'Name', value))}>{user.name}</td>
                        <td contentEditable onChange={(value => updatechanges(user.id, 'Website', value))} >{user.website}</td>
                        <td contentEditable onChange={(value => updatechanges(user.id, 'Email', value))}>{user.email}</td>
                        <td><button onClick={() => update(user.id)} className='update'>Update</button><button className='delete' onClick={(value) => deletingdatas(user.id)}>Delete</button></td>
                    </tr >
                )
                }
                <tfoot >
                    <tr className='noborderline'>
                        <td className='noborderline'></td>
                        <td className='noborderline' ><input type="text" onChange={(e) => setNewName(e.target.value)} value={newName} placeholder='Enter Name...' /></td>
                        <td className='noborderline'><input type="text" onChange={(e) => setNewEmail(e.target.value)} value={newEmail} placeholder='Enter Email...' /></td>
                        <td className='noborderline'><input type="text" onChange={(e) => setNewWebsite(e.target.value)} value={newWebsite} placeholder='Enter Website...' /></td>
                        <td className='noborderline'><button onClick={adduser} className='New'>New</button></td>
                    </tr>
                </tfoot>
            </table >
        </>
    )
}

export default Crud