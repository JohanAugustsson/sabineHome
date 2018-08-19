import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import CakeView from '../../components/cakes/CakeView'

class HomePage extends React.Component{

  goToPage = (event,id) =>{
    this.props.history.push(`cake/${id}`);
  }

  render(){
    const { cakes } = this.props;
    return(
      <div>
        { cakes ? <CakeView cakes={cakes} goToPage={this.goToPage} /> : null}
      </div>
    )
  }
}


const mapStateToProps = (state) =>({
  cakes: state.firestore.ordered.cakes
})

const listenersFirestore = (props) => ([
  'cakes'
])


export default compose (
  firestoreConnect(listenersFirestore),  // or { collection: 'cakes' }
  connect(mapStateToProps)
  )(HomePage);
