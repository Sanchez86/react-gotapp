import {Component} from "react";
import ErrorMessage from "../itemList/itemList";

const withData = (View, getData) => {
    return class extends Component {
        state = {
            data: null,
            error: false
        };

        onError() {
            this.setState({
                error: true
            })
        }

        componentDidMount() {
            getData()
                .then((data) => {
                    this.setState({
                        data
                    })
                })
                .catch(() => this.onError())
        }

        render(){
            const {data, error} = this.state;

            if (error) {
                return <ErrorMessage/>
            }

            if (!data) {
                return <Spinner/>
            }

            return <View {...this.props} data={data} />
        }
    }
};

export {
    withData
}