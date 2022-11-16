import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { StyledRegisterVideo } from "./styles";

function getYoutubeThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

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

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function RegisterVideo({ loadVideos }){
    const [formVisivel, setFormVisivel] = useState(false);
    const formCadastro = useForm({
        initialValues: {titulo: "", url: "",categoria: ""}
    });

    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}> + </button>
            {formVisivel ? (<>
                <form onSubmit={(evento) => {
                    evento.preventDefault();

                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getYoutubeThumbnail(formCadastro.values.url),
                        playlist: formCadastro.values.categoria,
                    }).then((resp) => {
                        setFormVisivel(false);
                        formCadastro.clearForm();
                        loadVideos();
                    }).catch((err) => {
                        alert("Erro : " + err);
                    });
                }}>
                    <div>
                        <button type="button" className="close-modal"  onClick={() => {
                            setFormVisivel(false);
                            formCadastro.clearForm();
                        }}>X</button>
                        <input name="titulo" placeholder="Título do vídeo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange}/>
                        <input name="url" placeholder="URL" value={formCadastro.values.url} onChange={formCadastro.handleChange}/>
                        <input name="categoria" placeholder="Categoria" value={formCadastro.values.categoria} onChange={formCadastro.handleChange}/>
                        <button type="submit">Cadastrar</button>
                        {formCadastro.values.url ? (<>
                            <img src={getYoutubeThumbnail(formCadastro.values.url)}/>
                        </>) : (<></>)}
                    </div>
                </form>
            </>) : (<></>)}
        </StyledRegisterVideo>
    );
}