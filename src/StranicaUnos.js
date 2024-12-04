import React, {useState} from 'react';

function StranicaUnos({onSearch}){
    const [unos, setUnos] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(unos){
            onSearch(unos);
        }

    };


    return(
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Unesite adresu ili ID transakcije'
                value={unos}
                onChange={(e)=>setUnos(e.target.value)}
            />
            <br></br>
            <button type="submit">Pretrazi</button>
        </form>
    );

}

export default StranicaUnos;