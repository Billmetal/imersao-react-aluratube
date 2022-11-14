import { useState } from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm){
    const [values, setValues] = useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (e) => {
            setValues({...values, [e.target.name]: e.target.value});
        },
        clearForm: () => {
            setValues({});
        },
    };
}

export default function RegisterVideo(){
    const [formVisivel, setFormVisivel] = useState(false);
    const formCadastro = useForm({
        initialValues: {titulo: "", url: ""}
    });

    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}> + </button>
            {formVisivel ? (<>
                <form onSubmit={(evento) => {
                    evento.preventDefault();
                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal"  onClick={() => setFormVisivel(false)}>X</button>
                        <input name="titulo" placeholder="Título do vídeo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange}/>
                        <input name="url" placeholder="URL" value={formCadastro.values.url} onChange={formCadastro.handleChange}/>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </>) : (<></>)}
        </StyledRegisterVideo>
    );
}