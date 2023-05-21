import { useEffect, useState } from 'react'
import style from './style.module.scss'
import classNames from 'classnames'

const Component: React.FC<{ children: React.ReactNode; className: string }> = ({
  children,
  className,
}) => {
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(true)
  const [elementHeight, setElementHeight] = useState(0)

  useEffect(() => {
    let lastScrollPosition = window.pageYOffset

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset
      setIsScrollingUp(currentScrollPosition < lastScrollPosition)
      lastScrollPosition = currentScrollPosition
    }

    const handleResize = () => {
      const element = document.getElementById('scrollable-element')
      if (element) {
        setElementHeight(element.offsetHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    document.body.style.paddingTop = `${elementHeight}px`
    return () => {
      document.body.style.paddingTop = ''
    }
  }, [elementHeight])

  return (
    <div
      id="scrollable-element"
      className={classNames(className, style.ScrollableElement, { [style.Hidden]: !isScrollingUp })}
    >
      {children}
    </div>
  )
}

export default Component
