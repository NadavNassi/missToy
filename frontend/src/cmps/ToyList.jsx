import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, ...propsToPrev }) {
    return (
        <section className="toy-list">
            {toys.map(toy => <ToyPreview key={toy._id} toy={toy} {...propsToPrev} />)}
        </section>
    )
}