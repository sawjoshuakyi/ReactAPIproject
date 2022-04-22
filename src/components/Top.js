import { useState} from 'react'

const Top = () => {
    const [text, setText] = useState('')
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const handleClick = (e) => {
        e.preventDefault();
        let tempText = text.toLowerCase()
        fetch(`https://api.coincap.io/v2/assets/${tempText}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then((res) => res.json())
            .then(
            (result) => {
              setIsLoaded(true);
              setItems(result.data);
              console.log(result, typeof({items}), Object.keys(result.data).length);
            }
          ).then(
            (error) => {
                setIsLoaded(true);
                setError(error);
              }
          );
    }

    if(error){
        return (<h1>Error </h1>);
    }else{
        return (
        <div className = "container">
            <div className = "row">
                
                <div className = "col-md">
                    <h2>CryptoCurrency Data</h2>
                </div>
                <div className = "col-md">
                <form className = 'input-group' onSubmit={handleClick} >
                    <div className = 'form-outline rounded'>
                        <input type = 'text' placeholder='Search...' value = {text} onChange = {(e) => setText(e.target.value)}/>
                        <button id="button" type="submit" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </form>
                </div>
            </div>
            <div className = "my_container">
        {items.map ? <h3>Total items found: {items.length}</h3> : <h3>Total items found: 1</h3>}
            <table id="dtBasicExample" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                    <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price(USD)</th>
                        <th scope="col">Info</th>
                    </tr>
                    </thead>
                        {items.map ? <tbody>
                            {items.map(item =>(
                        <tr key = {item.id}>
                        <td>{item.rank}</td>
                        <td>{item.symbol}</td>
                        <td>{item.name} </td>
                        <td>$ {item.priceUsd}</td>
                            <td><a href ={item.explorer}>{item.explorer}</a></td>
                        </tr>
                        ))}
                        </tbody>: <tbody>
                            <tr>
                            <td>{items.rank}</td>
                            <td>{items.symbol}</td>
                            <td>{items.name} </td>
                            <td>$ {items.priceUsd}</td>
                            <td><a href ={items.explorer}>{items.explorer}</a></td>
                            </tr>
                            </tbody>}
                </table>
            </div>
        </div>
    )
                            }
}

export default Top
