import  App, { AppProps } from 'next/app'
import React from 'react'
import Router from 'next/router'
import '../styles/global.sass'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import '../i18n'



/*---Redux---*/
import {Provider} from 'react-redux'
import withRedux from 'next-redux-wrapper'
import store from '../redux/store'

/*---Components----*/
import MainComponent from "../components/Main-Component"
import {Preloader} from "../components/preloader/Preloader"

/*---Skeleton----*/
import {HomePreloader} from "../components/skeleton/Home-Preloader"
import {CategoriesList} from "../components/skeleton/Categories-List"
import {ProductList} from "../components/skeleton/Product-List"
import {ProductView} from "../components/skeleton/Product-View"
import {CartPreloader} from "../components/skeleton/Cart-preloader"

interface IState{
  loading: boolean
}

interface IProps{

}

class MyApp extends App<IProps,IState> {

  state = {
    loading: true,
    path: ''
  }




  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return {pageProps: pageProps}
  }

  handlerStart(url){
      this.setState({path: url })
      if(!this.state.loading) this.setState({loading: true})
  }

    handlerComplete(){
        this.setState({loading: false})
    }

    componentDidMount(){
      window.onload = (e)=>{
          if(e.type==='load'){
              this.handlerStart(this.props.router.asPath)
              setTimeout(()=>this.handlerComplete(), 50)
          }
      }

        Router.events.on('routeChangeStart', (url)=>{
            this.handlerStart(url)
        })
        Router.events.on('routeChangeComplete', ()=>{
            this.handlerComplete()
        })
        Router.events.on('routeChangeError', ()=>this.handlerComplete())
    }

    componentWillUnmount() {

        Router.events.off('routeChangeStart', (url)=>{
            this.handlerStart(url)
        })
        Router.events.off('routeChangeComplete', ()=>{
            this.handlerComplete()
        })
        Router.events.off('routeChangeError', ()=>this.handlerComplete())
    }




    skeletonTemplates(url){

      const urlP = url!==''?url:this.props.router.asPath

      if(urlP==='/'){
          return <HomePreloader />
      }else if(urlP.match(/\/categories/gi)!==null){
          return <CategoriesList />
      }else if(urlP.match(/\/products/gi)!==null){
          return <ProductList />
      }else if(urlP.match(/\/product/gi)!==null){
          return <ProductView />
      }else if(urlP.match(/\/cart/gi)!==null){
          return <CartPreloader />
      }else{
          return <Preloader />
      }

  }


  render(){

    const {Component, pageProps} = this.props

      if(this.state.loading){

        return(
            <MainComponent>
                {this.skeletonTemplates(this.state.path)}
            </MainComponent>
        )
      }
        return (

            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>

        )


  }

}

const makeStore = ()=> store

export default withRedux(makeStore)(MyApp)
