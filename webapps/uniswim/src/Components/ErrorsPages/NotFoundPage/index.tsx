import * as React from "react";
import DocumentTitle from "../../DocumentTitle";



class NotFoundPage extends React.PureComponent<any, any>
{
    render(){
        return (
            <DocumentTitle title="Page non trouvée">
                <div>
                    page non trouvée
                </div>
            </DocumentTitle>
        )
    }
}

export default NotFoundPage;