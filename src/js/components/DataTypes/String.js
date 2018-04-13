import React from "react"
import DataTypeLabel from "./DataTypeLabel"
import { toType } from "./../../helpers/util"

//theme
import Theme from "./../../themes/getStyle"

//attribute store for storing collapsed state
import AttributeStore from "./../../stores/ObjectAttributes"

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state.collapsed = AttributeStore.get(
            props.rjvId,
            props.namespace,
            "collapsed",
            true
        )
    }

    state = {
        collapsed: true
    }

    toggleCollapsed = () => {
        this.state.collapsed = !this.state.collapsed
        AttributeStore.set(
            this.props.rjvId,
            this.props.namespace,
            "collapsed",
            this.state.collapsed
        )
        this.setState(this.state)
    }

    isValidURL(str) {
      var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
        '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
        '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
        '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
        '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
        '(\#[-a-z\d_]*)?$','i'); // fragment locater
      if(!pattern.test(str)) {
        return false;
      } else {
        return true;
      }
    }

    render() {


        const type_name = "string"
        const { collapsed } = this.state
        const { props } = this
        const { collapseStringsAfterLength, theme } = props
        let { value } = props
        let collapsible = toType(collapseStringsAfterLength) == "integer"
        let style = { style: { cursor: "default" } }

        if (collapsible && value.length > collapseStringsAfterLength) {
            style.style.cursor = "pointer"
            if (this.state.collapsed) {
                value = (
                    <span>
                        {value.substring(0, collapseStringsAfterLength)}
                        <span {...Theme(theme, "ellipsis")}> ...</span>
                    </span>
                )
            }
        }

        let renderStringValue = this.isValidURL(value) ? <a target='_blank' href={value}>"{value}"</a> : "{value}";

        return (
            <div {...Theme(theme, "string")}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span
                    class="string-value"
                    {...style}
                    onClick={this.toggleCollapsed}
                >
                    "{value}"
                </span>
            </div>
        )
    }
}
