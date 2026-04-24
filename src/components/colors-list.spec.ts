import { expect, it } from 'vitest'
import { render } from '@testing-library/vue'

import router from '@/router/index'
import ColorsList from './colors-list.vue'

it('should render colors links', () => {
  const { getByRole } = render(ColorsList, {
    global: {
      plugins: [router],
    },
  })

  expect(getByRole('link', { name: '深緋' })).not.toBeNull()
})
