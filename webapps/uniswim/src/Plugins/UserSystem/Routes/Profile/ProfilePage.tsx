import React, { Fragment } from "react"
import { StyleRulesCallback } from "@material-ui/styles/withStyles";
import DocumentTitle from "../../../../Components/DocumentTitle";

type props = {

}

const ProfilePage = (props: props) => {
    return (
        <Fragment>
            <DocumentTitle title="Mon Profil" />
            <div>
                Page de Profil
            </div>
        </Fragment>
    )
}
ProfilePage.displayName=  "ProfilPage";

export default ProfilePage;