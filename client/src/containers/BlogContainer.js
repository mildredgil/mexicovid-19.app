import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { config } from "../config";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import { getUrlParams } from '../Utils/tools';

const useBlog = () => {
  const [posts, setPosts] = React.useState([]);
  const [category, setCategory] = React.useState(0);
  const history = useHistory();

  const categories = [
    {
      img: "",
      alt: "",
      text: "blog"
    },        
    {
      img: "icons/iconosInfraestructura.png" ,
      alt: "iconosInfraestructura",
      text: "Infraestructura"
    },        
    {
      img: "icons/iconosEconomia.png" ,
      alt: "iconosEconomia",
      text: "Economía"
    },        
    {
      img: "icons/iconosExaminacion.png" ,
      alt: "iconosExaminacion",
      text: "Analisis de pruebas"
    },        
    {
      img: "icons/iconosConfirmados.png" ,
      alt: "iconosConfirmados",
      text: "Confirmados"
    },        
    {
      img: "icons/iconosDesglose.png" ,
      alt: "iconosDesglose",
      text: "Información clinica"
    },        
    {
      img: "icons/iconosGeografia.png" ,
      alt: "iconosGeografia",
      text: "Geografía"
    },
    {
      img: "icons/iconosComercio.png" ,
      alt: "iconosComercio",
      text: "Comercio"
    }
  ]
  const GET_POSTS = gql`{
      repository(owner: "${config.githubUserName}", name: "${config.githubRepo}") {
        issues(first: 100, states: OPEN, filterBy: { labels: "${categories[category].text}" }) {
          nodes {
            title
            body
            bodyHTML
            bodyText
            number
            labels(first: 100) {
              nodes {
                color
                name
                id
              }
            }
            author {
              url
              avatarUrl
              login
            }
            updatedAt
            id
          }
        }
      }
    }
    `
    
  const { loading, error, data } = useQuery(GET_POSTS);

  React.useEffect( () => {
    let params = getUrlParams();

    if( typeof(params) !== "undefined") {
      let categoriesLen = categories.length;
      if( categoriesLen > params.cat)
        setCategory(params.cat);
    }
  }, []);

  React.useEffect(() => {
    if (!loading) {
      if (error) {
        console.error(error)
      }

      if (data) {
        if( data && data.repository && data.repository.issues) {
          let _post = data.repository.issues.nodes;
          setPosts(_post.reverse())
        }
      }
    }
  }, [loading, error, data]);

    
  const openBlog = (title, number) => {
    history.push(`/research/${title}/${number}`);
  }

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  }
    
  return {
    posts,
    loading,
    openBlog,
    onChangeCategory,
    categories,
    category
  }
}

export default useBlog;