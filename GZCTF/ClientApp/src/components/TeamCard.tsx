import { FC } from 'react'
import {
  Group,
  Title,
  Text,
  Divider,
  Avatar,
  Badge,
  Card,
  Stack,
  Box,
  Tooltip,
} from '@mantine/core'
import { mdiLockOutline } from '@mdi/js'
import { Icon } from '@mdi/react'
import { useTooltipStyles } from '@Utils/ThemeOverride'
import { TeamInfoModel } from '@Api'

interface TeamCardProps {
  team: TeamInfoModel
  isCaptain: boolean
  onEdit: () => void
}

const AVATAR_LIMIT = 5

const TeamCard: FC<TeamCardProps> = (props) => {
  const { team, isCaptain, onEdit } = props

  const captain = team.members?.filter((m) => m?.captain).at(0)
  const members = team.members?.filter((m) => !m?.captain)

  const { classes: tooltipClasses, theme } = useTooltipStyles()

  return (
    <Card
      shadow="sm"
      onClick={onEdit}
      sx={(theme) => ({
        cursor: 'pointer',
        transition: 'filter .2s',
        '&:hover': {
          filter: theme.colorScheme === 'dark' ? 'brightness(1.2)' : 'brightness(.97)',
        },
      })}
    >
      <Group align="stretch" style={{ flexWrap: 'nowrap', alignItems: 'center' }}>
        <Stack style={{ flexGrow: 1 }}>
          <Group align="stretch" position="apart">
            <Avatar color="cyan" size="lg" radius="md" src={team.avatar}>
              {team.name?.at(0) ?? 'T'}
            </Avatar>

            <Stack spacing={0} style={{ width: 'calc(100% - 72px)' }}>
              <Group style={{ width: '100%' }} position="left">
                <Title order={2} align="left">
                  {team.name}
                </Title>
              </Group>
              <Text size="sm" lineClamp={2} style={{ overflow: 'hidden' }}>
                {team.bio}
              </Text>
            </Stack>
          </Group>
          <Divider my="xs" />
          <Stack spacing="xs">
            <Group spacing="xs" position="apart">
              <Text transform="uppercase" color="dimmed">
                个人身份:
              </Text>
              {isCaptain ? (
                <Badge color="yellow" size="lg">
                  队长
                </Badge>
              ) : (
                <Badge color="gray" size="lg">
                  普通队员
                </Badge>
              )}
            </Group>
            <Group spacing="xs">
              <Text transform="uppercase" color="dimmed">
                队员列表:
              </Text>
              <Box style={{ flexGrow: 1 }}></Box>
              {team.locked && (
                <Icon path={mdiLockOutline} size={1} color={theme.colors.yellow[6]} />
              )}
              <Tooltip.Group openDelay={300} closeDelay={100}>
                <Avatar.Group
                  spacing="md"
                  styles={{
                    child: {
                      border: 'none',
                    },
                  }}
                >
                  <Tooltip
                    label={captain?.userName}
                    withArrow
                    classNames={{
                      tooltip: tooltipClasses.tooltip,
                    }}
                  >
                    <Avatar radius="xl" src={captain?.avatar} />
                  </Tooltip>
                  {members &&
                    members.slice(0, AVATAR_LIMIT).map((m) => (
                      <Tooltip
                        key={m.id}
                        label={m.userName}
                        withArrow
                        classNames={{
                          tooltip: tooltipClasses.tooltip,
                        }}
                      >
                        <Avatar radius="xl" src={m.avatar} />
                      </Tooltip>
                    ))}
                  {members && members.length > AVATAR_LIMIT && (
                    <Tooltip
                      label={<Text>{members.slice(AVATAR_LIMIT).join(',')}</Text>}
                      withArrow
                      classNames={{
                        tooltip: tooltipClasses.tooltip,
                      }}
                    >
                      <Avatar radius="xl">+{members.length - AVATAR_LIMIT}</Avatar>
                    </Tooltip>
                  )}
                </Avatar.Group>
              </Tooltip.Group>
            </Group>
          </Stack>
        </Stack>
      </Group>
    </Card>
  )
}

export default TeamCard
