import Link from 'next/link'
import { useSelector, shallowEqual } from 'react-redux'
import _ from 'lodash'

import Image from '../../image'
import { chainName, connext } from '../../../lib/object/chain'

export default (
  {
    onClick,
  },
) => {
  const {
    chains,
  } = useSelector(state =>
    (
      {
        chains: state.chains,
      }
    ),
    shallowEqual,
  )
  const {
    chains_data,
  } = { ...chains }

  return (
    <>
      <div className="dropdown-title">
        Select Chain
      </div>
      <div className="flex flex-wrap pb-1">
        {
          _.concat(
            connext,
            chains_data,
          )
          .filter(c =>
            c &&
            !c.menu_hidden
          )
          .map(c => {
            const {
              id,
              disabled,
              image,
            } = { ...c }

            const item =
              (
                <>
                  <Image
                    src={image}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="leading-4 text-2xs font-medium">
                    {chainName(c)}
                  </span>
                </>
              )

            return (
              disabled ?
                <div
                  key={id}
                  title="Disabled"
                  className="dropdown-item w-1/2 cursor-not-allowed flex items-center justify-start font-medium space-x-1.5 p-2"
                >
                  {item}
                </div> :
                <Link
                  key={id}
                  href={`/${id}`}
                >
                  <a
                    onClick={onClick}
                    className="dropdown-item w-1/2 flex items-center justify-start space-x-1.5 p-2"
                  >
                    {item}
                  </a>
                </Link>
            )
          })
        }
      </div>
    </>
  )
}