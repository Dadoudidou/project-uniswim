import React from "react"
import { MutationOptions, FetchResult } from "react-apollo";

type state = {
    loading: boolean
    error: string
}

type submitFN<TData = {}, TVariable = {}> = (
    event: React.FormEvent<any>, 
    variables: TVariable,
    options?: {
    } & MutationOptions<TData, TVariable>
) => Promise<FetchResult<TData>>

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export type WithMutatable<TData = {}, TVariable = {}> = {
    loading: boolean
    error?: string
    submit: submitFN<TData, TVariable>
}

type mutatableOptions<TData = {}, TVariable = {}> = {
    mutationName?: string
    options?: MutationOptions<TData, TVariable>
}

export default function mutatable<TData = {}, TVariable = {}>(mutatableOptions: mutatableOptions<TData, TVariable> = {}) {
    return (SourceComponent) => {
        class Mutatable extends React.Component<any, state> {
            static displayName = `Mutatable(${getDisplayName(SourceComponent)})`;
            constructor(props) {
                super(props);
                this.state = {
                    loading: false,
                    error: undefined
                }
            }
            submit: submitFN = async (event, variables, options = undefined) => {
                event.preventDefault();
                let mutationName = mutatableOptions && mutatableOptions.mutationName ? mutatableOptions.mutationName : "mutate";
                let _options = {
                    ...(mutatableOptions ? mutatableOptions.options : {}), 
                    variables, 
                    ...options
                }
                this.setState({ loading: true, error: undefined });
                let _rep = await this.props[mutationName](_options);
                let _error = undefined;
                if(_rep && _rep.errors && _rep.errors.length > 0){
                    _error = _rep.errors[0].message;
                }
                this.setState({ loading: false, error: _error  });
                return _rep;
                /*return this.props[mutationName](_options)
                    .then((data) => {
                        this.setState({ loading: false });
                        return data;
                    })
                    .catch((error) => {
                        this.setState({ loading: false, error: error.message });
                        return {
                            errors: [ error ]
                        };
                    });*/
            }
            render() {
                let mutationName = mutatableOptions && mutatableOptions.mutationName ? mutatableOptions.mutationName : "mutate";
                const { [mutationName]: mutate, ...otherProps } = this.props;
                let _props = {
                    ...otherProps,
                    [mutationName]: {
                        loading:this.state.loading,
                        error:this.state.error,
                        submit:this.submit
                    }
                }
                return (
                    <SourceComponent
                        {..._props}
                    />
                )
            }
        }
        return Mutatable;
    }
}