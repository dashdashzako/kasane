import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import VisuallyHidden from './visually-hidden.vue'

describe('<visually-hidden>', () => {
  it('allows tag customization', () => {
    const { html } = render(VisuallyHidden, {
      props: {
        tag: 'test-tag',
      },
      slots: {
        default: '[Test]',
      },
    })

    expect(html()).toMatchSnapshot()
  })
})
