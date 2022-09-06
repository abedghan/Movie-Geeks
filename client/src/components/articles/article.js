import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader, htmlDecode } from "../../utilis/tools";
import { useSelector, useDispatch } from "react-redux";
import { getArticle } from "../../store/actions/articles";
import ScoreCard from "../../utilis/score_card";
import Moment from 'react-moment'

const Article = () => {
    const articles = useSelector(state => state.articles)
    const dispatch = useDispatch()
    const { id } = useParams()
    

    useEffect(() => {

        dispatch(getArticle(id))
    }, [id, dispatch])
    useEffect(() => {
        window.scrollTo(0,0);
     }, [])

    //  let articleDate = articles.current.date;
     
    return (

        <>
        <>{articles.categories.name}</>
            {articles && articles.current ?
                <div className='article_container '>

                    <div style={{
                        background: `url(${articles.current.photo})`
                    }}
                        className='image'
                    >
                       
                    </div>

                    <span className="date-format">Published By: {articles.current.createdBy} </span>
                    <Moment className="date-format" format="DD.MM.YYYY HH:mm">{articles.current.date}</Moment>
                         
                    
                    <h1>{articles.current.title}</h1>
                    <div className="mt-3 content">
                    <div dangerouslySetInnerHTML={
                        {__html:htmlDecode(articles.current.content)}

                    }>

                    </div>
                    </div>
                    <ScoreCard current={articles.current} />
                   
                </div>
                        

                : <Loader />}
        </>
    )
}

export default Article;