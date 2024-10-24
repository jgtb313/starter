import { Tabs as MTabs, TabsProps as MTabsProps } from '@mantine/core'
import { cnBase } from 'tailwind-variants'

import { Icon } from '../Icon'
import { TabsStyles } from './Tabs.styles'
import { TabsProps } from './Tabs.types'

export const Tabs = ({ value, items = [], padding = false, grow = false, fixed = false, onChange, ...props }: TabsProps) => {
  const styles = TabsStyles({ padding, fixed })

  const handleChange: MTabsProps['onChange'] = (value) => {
    onChange?.(value ?? '')
  }

  return (
    <MTabs {...props} value={value} onChange={handleChange}>
      <MTabs.List classNames={{ list: cnBase(styles.list()) }} grow={grow}>
        {items.map((item) => (
          <MTabs.Tab
            classNames={{ tab: styles.tab(), tabLabel: styles.tabLabel() }}
            key={item.value}
            value={item.value}
            leftSection={item.icon && <Icon name={item.icon} width={22} height={22} />}
          >
            {item.label}
          </MTabs.Tab>
        ))}
      </MTabs.List>

      {items.map((item) => (
        <MTabs.Panel classNames={{ panel: styles.tabPanel() }} key={item.value} value={item.value}>
          {item.children}
        </MTabs.Panel>
      ))}
    </MTabs>
  )
}
