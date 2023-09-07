interface Props {
    err: Error
}

export function ErrorComponent(props: Props) {
    return <div
        className={"bg-red-900 text-slate-300 p-5"}>
        Error: {props.err.message}
    </div>
}
