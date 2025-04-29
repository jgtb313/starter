// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.

import { signIn } from '@starter/client'
import { passwordLess } from '@starter/client'
import { socialSignOn } from '@starter/client'
import { signUp } from '@starter/client'
import { forgotPassword } from '@starter/client'
import { getPresignedUrl } from '@starter/client'
import { listOrganizations } from '@starter/client'
import { createOrganization } from '@starter/client'
import { getOrganization } from '@starter/client'
import { updateOrganization } from '@starter/client'
import { deleteOrganization } from '@starter/client'
import { validateOTP } from '@starter/client'
import { sendPasswordLessOTP } from '@starter/client'
import { sendForgotPasswordOTP } from '@starter/client'
import { sendUpdateEmailOTP } from '@starter/client'
import { sendUpdatePhoneOTP } from '@starter/client'
import { getPermissions } from '@starter/client'
import { listPlans } from '@starter/client'
import { getProfile } from '@starter/client'
import { updateProfile } from '@starter/client'
import { deactivateProfile } from '@starter/client'
import { updateProfileEmail } from '@starter/client'
import { updateProfilePhone } from '@starter/client'
import { updateProfilePassword } from '@starter/client'
import { listRoles } from '@starter/client'
import { createRole } from '@starter/client'
import { getRole } from '@starter/client'
import { updateRole } from '@starter/client'
import { deleteRole } from '@starter/client'
import { example } from '@starter/client'
import { listUsers } from '@starter/client'
import { createUser } from '@starter/client'
import { getUser } from '@starter/client'
import { updateUser } from '@starter/client'
import { getWorkspace } from '@starter/client'
import { updateWorkspace } from '@starter/client'
import { createWorkspace } from '@starter/client'
import { useQuery, useMutation, useReadCache, UseRequestOptions, UseQueryOptions, UseMutationOptions, MakeRequestEvents } from '@starter/use-request'

import { useStore } from '@/store.context'

export const useSignIn = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof signIn>>, Parameters<typeof signIn>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useSignInEvents = store.events['useSignIn'] ?? {}
  const events = {
    ...useSignInEvents,
    onError: useSignInEvents['onError'] ?? store.onError,
  }

  return useMutation(signIn, { ...options, events })
}
export const usePasswordLess = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof passwordLess>>, Parameters<typeof passwordLess>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const usePasswordLessEvents = store.events['usePasswordLess'] ?? {}
  const events = {
    ...usePasswordLessEvents,
    onError: usePasswordLessEvents['onError'] ?? store.onError,
  }

  return useMutation(passwordLess, { ...options, events })
}
export const useSocialSignOn = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof socialSignOn>>, Parameters<typeof socialSignOn>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useSocialSignOnEvents = store.events['useSocialSignOn'] ?? {}
  const events = {
    ...useSocialSignOnEvents,
    onError: useSocialSignOnEvents['onError'] ?? store.onError,
  }

  return useMutation(socialSignOn, { ...options, events })
}
export const useSignUp = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof signUp>>, Parameters<typeof signUp>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useSignUpEvents = store.events['useSignUp'] ?? {}
  const events = {
    ...useSignUpEvents,
    onError: useSignUpEvents['onError'] ?? store.onError,
  }

  return useMutation(signUp, { ...options, events })
}
export const useForgotPassword = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof forgotPassword>>, Parameters<typeof forgotPassword>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useForgotPasswordEvents = store.events['useForgotPassword'] ?? {}
  const events = {
    ...useForgotPasswordEvents,
    onError: useForgotPasswordEvents['onError'] ?? store.onError,
  }

  return useMutation(forgotPassword, { ...options, events })
}
export const useGetPresignedUrl = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof getPresignedUrl>>, Parameters<typeof getPresignedUrl>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useGetPresignedUrlEvents = store.events['useGetPresignedUrl'] ?? {}
  const events = {
    ...useGetPresignedUrlEvents,
    onError: useGetPresignedUrlEvents['onError'] ?? store.onError,
  }

  return useMutation(getPresignedUrl, { ...options, events })
}
export const useListOrganizations = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof listOrganizations>>, Parameters<typeof listOrganizations>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useListOrganizationsEvents = store.events['useListOrganizations'] ?? {}
  const events = {
    ...useListOrganizationsEvents,
    onError: useListOrganizationsEvents['onError'] ?? store.onError,
  }

  return useQuery(listOrganizations, { ...options, queryKey: 'useListOrganizations', events })
}
export const useCreateOrganization = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof createOrganization>>, Parameters<typeof createOrganization>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useCreateOrganizationEvents = store.events['useCreateOrganization'] ?? {}
  const events = {
    ...useCreateOrganizationEvents,
    onError: useCreateOrganizationEvents['onError'] ?? store.onError,
  }

  return useMutation(createOrganization, { ...options, events })
}
export const useGetOrganization = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof getOrganization>>, Parameters<typeof getOrganization>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useGetOrganizationEvents = store.events['useGetOrganization'] ?? {}
  const events = {
    ...useGetOrganizationEvents,
    onError: useGetOrganizationEvents['onError'] ?? store.onError,
  }

  return useQuery(getOrganization, { ...options, queryKey: 'useGetOrganization', events })
}
export const useUpdateOrganization = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof updateOrganization>>, Parameters<typeof updateOrganization>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useUpdateOrganizationEvents = store.events['useUpdateOrganization'] ?? {}
  const events = {
    ...useUpdateOrganizationEvents,
    onError: useUpdateOrganizationEvents['onError'] ?? store.onError,
  }

  return useMutation(updateOrganization, { ...options, events })
}
export const useDeleteOrganization = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof deleteOrganization>>, Parameters<typeof deleteOrganization>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useDeleteOrganizationEvents = store.events['useDeleteOrganization'] ?? {}
  const events = {
    ...useDeleteOrganizationEvents,
    onError: useDeleteOrganizationEvents['onError'] ?? store.onError,
  }

  return useMutation(deleteOrganization, { ...options, events })
}
export const useValidateOTP = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof validateOTP>>, Parameters<typeof validateOTP>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useValidateOTPEvents = store.events['useValidateOTP'] ?? {}
  const events = {
    ...useValidateOTPEvents,
    onError: useValidateOTPEvents['onError'] ?? store.onError,
  }

  return useMutation(validateOTP, { ...options, events })
}
export const useSendPasswordLessOTP = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof sendPasswordLessOTP>>, Parameters<typeof sendPasswordLessOTP>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useSendPasswordLessOTPEvents = store.events['useSendPasswordLessOTP'] ?? {}
  const events = {
    ...useSendPasswordLessOTPEvents,
    onError: useSendPasswordLessOTPEvents['onError'] ?? store.onError,
  }

  return useMutation(sendPasswordLessOTP, { ...options, events })
}
export const useSendForgotPasswordOTP = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof sendForgotPasswordOTP>>, Parameters<typeof sendForgotPasswordOTP>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useSendForgotPasswordOTPEvents = store.events['useSendForgotPasswordOTP'] ?? {}
  const events = {
    ...useSendForgotPasswordOTPEvents,
    onError: useSendForgotPasswordOTPEvents['onError'] ?? store.onError,
  }

  return useMutation(sendForgotPasswordOTP, { ...options, events })
}
export const useSendUpdateEmailOTP = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof sendUpdateEmailOTP>>, Parameters<typeof sendUpdateEmailOTP>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useSendUpdateEmailOTPEvents = store.events['useSendUpdateEmailOTP'] ?? {}
  const events = {
    ...useSendUpdateEmailOTPEvents,
    onError: useSendUpdateEmailOTPEvents['onError'] ?? store.onError,
  }

  return useMutation(sendUpdateEmailOTP, { ...options, events })
}
export const useSendUpdatePhoneOTP = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof sendUpdatePhoneOTP>>, Parameters<typeof sendUpdatePhoneOTP>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useSendUpdatePhoneOTPEvents = store.events['useSendUpdatePhoneOTP'] ?? {}
  const events = {
    ...useSendUpdatePhoneOTPEvents,
    onError: useSendUpdatePhoneOTPEvents['onError'] ?? store.onError,
  }

  return useMutation(sendUpdatePhoneOTP, { ...options, events })
}
export const useGetPermissions = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof getPermissions>>, Parameters<typeof getPermissions>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useGetPermissionsEvents = store.events['useGetPermissions'] ?? {}
  const events = {
    ...useGetPermissionsEvents,
    onError: useGetPermissionsEvents['onError'] ?? store.onError,
  }

  return useQuery(getPermissions, { ...options, queryKey: 'useGetPermissions', events })
}
export const useListPlans = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof listPlans>>, Parameters<typeof listPlans>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useListPlansEvents = store.events['useListPlans'] ?? {}
  const events = {
    ...useListPlansEvents,
    onError: useListPlansEvents['onError'] ?? store.onError,
  }

  return useQuery(listPlans, { ...options, queryKey: 'useListPlans', events })
}
export const useGetProfile = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof getProfile>>, Parameters<typeof getProfile>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useGetProfileEvents = store.events['useGetProfile'] ?? {}
  const events = {
    ...useGetProfileEvents,
    onError: useGetProfileEvents['onError'] ?? store.onError,
  }

  return useQuery(getProfile, { ...options, queryKey: 'useGetProfile', events })
}
export const useUpdateProfile = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof updateProfile>>, Parameters<typeof updateProfile>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useUpdateProfileEvents = store.events['useUpdateProfile'] ?? {}
  const events = {
    ...useUpdateProfileEvents,
    onError: useUpdateProfileEvents['onError'] ?? store.onError,
  }

  return useMutation(updateProfile, { ...options, events })
}
export const useDeactivateProfile = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof deactivateProfile>>, Parameters<typeof deactivateProfile>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useDeactivateProfileEvents = store.events['useDeactivateProfile'] ?? {}
  const events = {
    ...useDeactivateProfileEvents,
    onError: useDeactivateProfileEvents['onError'] ?? store.onError,
  }

  return useMutation(deactivateProfile, { ...options, events })
}
export const useUpdateProfileEmail = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof updateProfileEmail>>, Parameters<typeof updateProfileEmail>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useUpdateProfileEmailEvents = store.events['useUpdateProfileEmail'] ?? {}
  const events = {
    ...useUpdateProfileEmailEvents,
    onError: useUpdateProfileEmailEvents['onError'] ?? store.onError,
  }

  return useMutation(updateProfileEmail, { ...options, events })
}
export const useUpdateProfilePhone = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof updateProfilePhone>>, Parameters<typeof updateProfilePhone>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useUpdateProfilePhoneEvents = store.events['useUpdateProfilePhone'] ?? {}
  const events = {
    ...useUpdateProfilePhoneEvents,
    onError: useUpdateProfilePhoneEvents['onError'] ?? store.onError,
  }

  return useMutation(updateProfilePhone, { ...options, events })
}
export const useUpdateProfilePassword = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof updateProfilePassword>>, Parameters<typeof updateProfilePassword>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useUpdateProfilePasswordEvents = store.events['useUpdateProfilePassword'] ?? {}
  const events = {
    ...useUpdateProfilePasswordEvents,
    onError: useUpdateProfilePasswordEvents['onError'] ?? store.onError,
  }

  return useMutation(updateProfilePassword, { ...options, events })
}
export const useListRoles = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof listRoles>>, Parameters<typeof listRoles>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useListRolesEvents = store.events['useListRoles'] ?? {}
  const events = {
    ...useListRolesEvents,
    onError: useListRolesEvents['onError'] ?? store.onError,
  }

  return useQuery(listRoles, { ...options, queryKey: 'useListRoles', events })
}
export const useCreateRole = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof createRole>>, Parameters<typeof createRole>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useCreateRoleEvents = store.events['useCreateRole'] ?? {}
  const events = {
    ...useCreateRoleEvents,
    onError: useCreateRoleEvents['onError'] ?? store.onError,
  }

  return useMutation(createRole, { ...options, events })
}
export const useGetRole = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof getRole>>, Parameters<typeof getRole>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useGetRoleEvents = store.events['useGetRole'] ?? {}
  const events = {
    ...useGetRoleEvents,
    onError: useGetRoleEvents['onError'] ?? store.onError,
  }

  return useQuery(getRole, { ...options, queryKey: 'useGetRole', events })
}
export const useUpdateRole = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof updateRole>>, Parameters<typeof updateRole>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useUpdateRoleEvents = store.events['useUpdateRole'] ?? {}
  const events = {
    ...useUpdateRoleEvents,
    onError: useUpdateRoleEvents['onError'] ?? store.onError,
  }

  return useMutation(updateRole, { ...options, events })
}
export const useDeleteRole = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof deleteRole>>, Parameters<typeof deleteRole>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useDeleteRoleEvents = store.events['useDeleteRole'] ?? {}
  const events = {
    ...useDeleteRoleEvents,
    onError: useDeleteRoleEvents['onError'] ?? store.onError,
  }

  return useMutation(deleteRole, { ...options, events })
}
export const useExample = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof example>>, Parameters<typeof example>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useExampleEvents = store.events['useExample'] ?? {}
  const events = {
    ...useExampleEvents,
    onError: useExampleEvents['onError'] ?? store.onError,
  }

  return useQuery(example, { ...options, queryKey: 'useExample', events })
}
export const useListUsers = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof listUsers>>, Parameters<typeof listUsers>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useListUsersEvents = store.events['useListUsers'] ?? {}
  const events = {
    ...useListUsersEvents,
    onError: useListUsersEvents['onError'] ?? store.onError,
  }

  return useQuery(listUsers, { ...options, queryKey: 'useListUsers', events })
}
export const useCreateUser = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof createUser>>, Parameters<typeof createUser>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useCreateUserEvents = store.events['useCreateUser'] ?? {}
  const events = {
    ...useCreateUserEvents,
    onError: useCreateUserEvents['onError'] ?? store.onError,
  }

  return useMutation(createUser, { ...options, events })
}
export const useGetUser = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof getUser>>, Parameters<typeof getUser>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useGetUserEvents = store.events['useGetUser'] ?? {}
  const events = {
    ...useGetUserEvents,
    onError: useGetUserEvents['onError'] ?? store.onError,
  }

  return useQuery(getUser, { ...options, queryKey: 'useGetUser', events })
}
export const useUpdateUser = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof updateUser>>, Parameters<typeof updateUser>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useUpdateUserEvents = store.events['useUpdateUser'] ?? {}
  const events = {
    ...useUpdateUserEvents,
    onError: useUpdateUserEvents['onError'] ?? store.onError,
  }

  return useMutation(updateUser, { ...options, events })
}
export const useGetWorkspace = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof getWorkspace>>, Parameters<typeof getWorkspace>[number]>, 'events'> &
    Omit<UseQueryOptions, 'queryKey'>,
) => {
  const store = useStore()
  const useGetWorkspaceEvents = store.events['useGetWorkspace'] ?? {}
  const events = {
    ...useGetWorkspaceEvents,
    onError: useGetWorkspaceEvents['onError'] ?? store.onError,
  }

  return useQuery(getWorkspace, { ...options, queryKey: 'useGetWorkspace', events })
}
export const useUpdateWorkspace = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof updateWorkspace>>, Parameters<typeof updateWorkspace>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useUpdateWorkspaceEvents = store.events['useUpdateWorkspace'] ?? {}
  const events = {
    ...useUpdateWorkspaceEvents,
    onError: useUpdateWorkspaceEvents['onError'] ?? store.onError,
  }

  return useMutation(updateWorkspace, { ...options, events })
}
export const useCreateWorkspace = (
  options?: Omit<UseRequestOptions<Awaited<ReturnType<typeof createWorkspace>>, Parameters<typeof createWorkspace>[number]>, 'events'> &
    UseMutationOptions<StoreInvalidate>,
) => {
  const store = useStore()
  const useCreateWorkspaceEvents = store.events['useCreateWorkspace'] ?? {}
  const events = {
    ...useCreateWorkspaceEvents,
    onError: useCreateWorkspaceEvents['onError'] ?? store.onError,
  }

  return useMutation(createWorkspace, { ...options, events })
}

export const useReadStore = <T extends keyof UseReadStore>({ queryKey, queryParams }: UseReadStoreOptions<T>): UseReadStore[T] => {
  const cache = useReadCache<UseReadStore[T]>(queryKey, queryParams)

  return cache
}

export type UseReadStoreOptions<T extends keyof UseReadStore> = {
  queryKey: T
  queryParams?: UseReadStoreParams[T]
}

export type UseReadStoreParams = {
  useListOrganizations?: Parameters<typeof listOrganizations>[number]
  useGetOrganization?: Parameters<typeof getOrganization>[number]
  useGetPermissions?: Parameters<typeof getPermissions>[number]
  useListPlans?: Parameters<typeof listPlans>[number]
  useGetProfile?: Parameters<typeof getProfile>[number]
  useListRoles?: Parameters<typeof listRoles>[number]
  useGetRole?: Parameters<typeof getRole>[number]
  useExample?: Parameters<typeof example>[number]
  useListUsers?: Parameters<typeof listUsers>[number]
  useGetUser?: Parameters<typeof getUser>[number]
  useGetWorkspace?: Parameters<typeof getWorkspace>[number]
}

export type UseReadStore = {
  useListOrganizations?: Awaited<ReturnType<typeof listOrganizations>>
  useGetOrganization?: Awaited<ReturnType<typeof getOrganization>>
  useGetPermissions?: Awaited<ReturnType<typeof getPermissions>>
  useListPlans?: Awaited<ReturnType<typeof listPlans>>
  useGetProfile?: Awaited<ReturnType<typeof getProfile>>
  useListRoles?: Awaited<ReturnType<typeof listRoles>>
  useGetRole?: Awaited<ReturnType<typeof getRole>>
  useExample?: Awaited<ReturnType<typeof example>>
  useListUsers?: Awaited<ReturnType<typeof listUsers>>
  useGetUser?: Awaited<ReturnType<typeof getUser>>
  useGetWorkspace?: Awaited<ReturnType<typeof getWorkspace>>
}

export type StoreParameters = {
  useSignIn?: Parameters<typeof signIn>[number]
  usePasswordLess?: Parameters<typeof passwordLess>[number]
  useSocialSignOn?: Parameters<typeof socialSignOn>[number]
  useSignUp?: Parameters<typeof signUp>[number]
  useForgotPassword?: Parameters<typeof forgotPassword>[number]
  useGetPresignedUrl?: Parameters<typeof getPresignedUrl>[number]
  useListOrganizations?: Parameters<typeof listOrganizations>[number]
  useCreateOrganization?: Parameters<typeof createOrganization>[number]
  useGetOrganization?: Parameters<typeof getOrganization>[number]
  useUpdateOrganization?: Parameters<typeof updateOrganization>[number]
  useDeleteOrganization?: Parameters<typeof deleteOrganization>[number]
  useValidateOTP?: Parameters<typeof validateOTP>[number]
  useSendPasswordLessOTP?: Parameters<typeof sendPasswordLessOTP>[number]
  useSendForgotPasswordOTP?: Parameters<typeof sendForgotPasswordOTP>[number]
  useSendUpdateEmailOTP?: Parameters<typeof sendUpdateEmailOTP>[number]
  useSendUpdatePhoneOTP?: Parameters<typeof sendUpdatePhoneOTP>[number]
  useGetPermissions?: Parameters<typeof getPermissions>[number]
  useListPlans?: Parameters<typeof listPlans>[number]
  useGetProfile?: Parameters<typeof getProfile>[number]
  useUpdateProfile?: Parameters<typeof updateProfile>[number]
  useDeactivateProfile?: Parameters<typeof deactivateProfile>[number]
  useUpdateProfileEmail?: Parameters<typeof updateProfileEmail>[number]
  useUpdateProfilePhone?: Parameters<typeof updateProfilePhone>[number]
  useUpdateProfilePassword?: Parameters<typeof updateProfilePassword>[number]
  useListRoles?: Parameters<typeof listRoles>[number]
  useCreateRole?: Parameters<typeof createRole>[number]
  useGetRole?: Parameters<typeof getRole>[number]
  useUpdateRole?: Parameters<typeof updateRole>[number]
  useDeleteRole?: Parameters<typeof deleteRole>[number]
  useExample?: Parameters<typeof example>[number]
  useListUsers?: Parameters<typeof listUsers>[number]
  useCreateUser?: Parameters<typeof createUser>[number]
  useGetUser?: Parameters<typeof getUser>[number]
  useUpdateUser?: Parameters<typeof updateUser>[number]
  useGetWorkspace?: Parameters<typeof getWorkspace>[number]
  useUpdateWorkspace?: Parameters<typeof updateWorkspace>[number]
  useCreateWorkspace?: Parameters<typeof createWorkspace>[number]
}

export type StoreInvalidate = {
  useListOrganizations?: Parameters<typeof listOrganizations>[number] | true
  useGetOrganization?: Parameters<typeof getOrganization>[number] | true
  useGetPermissions?: Parameters<typeof getPermissions>[number] | true
  useListPlans?: Parameters<typeof listPlans>[number] | true
  useGetProfile?: Parameters<typeof getProfile>[number] | true
  useListRoles?: Parameters<typeof listRoles>[number] | true
  useGetRole?: Parameters<typeof getRole>[number] | true
  useExample?: Parameters<typeof example>[number] | true
  useListUsers?: Parameters<typeof listUsers>[number] | true
  useGetUser?: Parameters<typeof getUser>[number] | true
  useGetWorkspace?: Parameters<typeof getWorkspace>[number] | true
}

export type StoreReturnType = {
  useSignIn?: Awaited<ReturnType<typeof signIn>>
  usePasswordLess?: Awaited<ReturnType<typeof passwordLess>>
  useSocialSignOn?: Awaited<ReturnType<typeof socialSignOn>>
  useSignUp?: Awaited<ReturnType<typeof signUp>>
  useForgotPassword?: Awaited<ReturnType<typeof forgotPassword>>
  useGetPresignedUrl?: Awaited<ReturnType<typeof getPresignedUrl>>
  useListOrganizations?: Awaited<ReturnType<typeof listOrganizations>>
  useCreateOrganization?: Awaited<ReturnType<typeof createOrganization>>
  useGetOrganization?: Awaited<ReturnType<typeof getOrganization>>
  useUpdateOrganization?: Awaited<ReturnType<typeof updateOrganization>>
  useDeleteOrganization?: Awaited<ReturnType<typeof deleteOrganization>>
  useValidateOTP?: Awaited<ReturnType<typeof validateOTP>>
  useSendPasswordLessOTP?: Awaited<ReturnType<typeof sendPasswordLessOTP>>
  useSendForgotPasswordOTP?: Awaited<ReturnType<typeof sendForgotPasswordOTP>>
  useSendUpdateEmailOTP?: Awaited<ReturnType<typeof sendUpdateEmailOTP>>
  useSendUpdatePhoneOTP?: Awaited<ReturnType<typeof sendUpdatePhoneOTP>>
  useGetPermissions?: Awaited<ReturnType<typeof getPermissions>>
  useListPlans?: Awaited<ReturnType<typeof listPlans>>
  useGetProfile?: Awaited<ReturnType<typeof getProfile>>
  useUpdateProfile?: Awaited<ReturnType<typeof updateProfile>>
  useDeactivateProfile?: Awaited<ReturnType<typeof deactivateProfile>>
  useUpdateProfileEmail?: Awaited<ReturnType<typeof updateProfileEmail>>
  useUpdateProfilePhone?: Awaited<ReturnType<typeof updateProfilePhone>>
  useUpdateProfilePassword?: Awaited<ReturnType<typeof updateProfilePassword>>
  useListRoles?: Awaited<ReturnType<typeof listRoles>>
  useCreateRole?: Awaited<ReturnType<typeof createRole>>
  useGetRole?: Awaited<ReturnType<typeof getRole>>
  useUpdateRole?: Awaited<ReturnType<typeof updateRole>>
  useDeleteRole?: Awaited<ReturnType<typeof deleteRole>>
  useExample?: Awaited<ReturnType<typeof example>>
  useListUsers?: Awaited<ReturnType<typeof listUsers>>
  useCreateUser?: Awaited<ReturnType<typeof createUser>>
  useGetUser?: Awaited<ReturnType<typeof getUser>>
  useUpdateUser?: Awaited<ReturnType<typeof updateUser>>
  useGetWorkspace?: Awaited<ReturnType<typeof getWorkspace>>
  useUpdateWorkspace?: Awaited<ReturnType<typeof updateWorkspace>>
  useCreateWorkspace?: Awaited<ReturnType<typeof createWorkspace>>
}

export type StoreEvents = {
  useSignIn?: MakeRequestEvents<StoreReturnType['useSignIn'], StoreParameters['useSignIn']>
  usePasswordLess?: MakeRequestEvents<StoreReturnType['usePasswordLess'], StoreParameters['usePasswordLess']>
  useSocialSignOn?: MakeRequestEvents<StoreReturnType['useSocialSignOn'], StoreParameters['useSocialSignOn']>
  useSignUp?: MakeRequestEvents<StoreReturnType['useSignUp'], StoreParameters['useSignUp']>
  useForgotPassword?: MakeRequestEvents<StoreReturnType['useForgotPassword'], StoreParameters['useForgotPassword']>
  useGetPresignedUrl?: MakeRequestEvents<StoreReturnType['useGetPresignedUrl'], StoreParameters['useGetPresignedUrl']>
  useListOrganizations?: MakeRequestEvents<StoreReturnType['useListOrganizations'], StoreParameters['useListOrganizations']>
  useCreateOrganization?: MakeRequestEvents<StoreReturnType['useCreateOrganization'], StoreParameters['useCreateOrganization']>
  useGetOrganization?: MakeRequestEvents<StoreReturnType['useGetOrganization'], StoreParameters['useGetOrganization']>
  useUpdateOrganization?: MakeRequestEvents<StoreReturnType['useUpdateOrganization'], StoreParameters['useUpdateOrganization']>
  useDeleteOrganization?: MakeRequestEvents<StoreReturnType['useDeleteOrganization'], StoreParameters['useDeleteOrganization']>
  useValidateOTP?: MakeRequestEvents<StoreReturnType['useValidateOTP'], StoreParameters['useValidateOTP']>
  useSendPasswordLessOTP?: MakeRequestEvents<StoreReturnType['useSendPasswordLessOTP'], StoreParameters['useSendPasswordLessOTP']>
  useSendForgotPasswordOTP?: MakeRequestEvents<StoreReturnType['useSendForgotPasswordOTP'], StoreParameters['useSendForgotPasswordOTP']>
  useSendUpdateEmailOTP?: MakeRequestEvents<StoreReturnType['useSendUpdateEmailOTP'], StoreParameters['useSendUpdateEmailOTP']>
  useSendUpdatePhoneOTP?: MakeRequestEvents<StoreReturnType['useSendUpdatePhoneOTP'], StoreParameters['useSendUpdatePhoneOTP']>
  useGetPermissions?: MakeRequestEvents<StoreReturnType['useGetPermissions'], StoreParameters['useGetPermissions']>
  useListPlans?: MakeRequestEvents<StoreReturnType['useListPlans'], StoreParameters['useListPlans']>
  useGetProfile?: MakeRequestEvents<StoreReturnType['useGetProfile'], StoreParameters['useGetProfile']>
  useUpdateProfile?: MakeRequestEvents<StoreReturnType['useUpdateProfile'], StoreParameters['useUpdateProfile']>
  useDeactivateProfile?: MakeRequestEvents<StoreReturnType['useDeactivateProfile'], StoreParameters['useDeactivateProfile']>
  useUpdateProfileEmail?: MakeRequestEvents<StoreReturnType['useUpdateProfileEmail'], StoreParameters['useUpdateProfileEmail']>
  useUpdateProfilePhone?: MakeRequestEvents<StoreReturnType['useUpdateProfilePhone'], StoreParameters['useUpdateProfilePhone']>
  useUpdateProfilePassword?: MakeRequestEvents<StoreReturnType['useUpdateProfilePassword'], StoreParameters['useUpdateProfilePassword']>
  useListRoles?: MakeRequestEvents<StoreReturnType['useListRoles'], StoreParameters['useListRoles']>
  useCreateRole?: MakeRequestEvents<StoreReturnType['useCreateRole'], StoreParameters['useCreateRole']>
  useGetRole?: MakeRequestEvents<StoreReturnType['useGetRole'], StoreParameters['useGetRole']>
  useUpdateRole?: MakeRequestEvents<StoreReturnType['useUpdateRole'], StoreParameters['useUpdateRole']>
  useDeleteRole?: MakeRequestEvents<StoreReturnType['useDeleteRole'], StoreParameters['useDeleteRole']>
  useExample?: MakeRequestEvents<StoreReturnType['useExample'], StoreParameters['useExample']>
  useListUsers?: MakeRequestEvents<StoreReturnType['useListUsers'], StoreParameters['useListUsers']>
  useCreateUser?: MakeRequestEvents<StoreReturnType['useCreateUser'], StoreParameters['useCreateUser']>
  useGetUser?: MakeRequestEvents<StoreReturnType['useGetUser'], StoreParameters['useGetUser']>
  useUpdateUser?: MakeRequestEvents<StoreReturnType['useUpdateUser'], StoreParameters['useUpdateUser']>
  useGetWorkspace?: MakeRequestEvents<StoreReturnType['useGetWorkspace'], StoreParameters['useGetWorkspace']>
  useUpdateWorkspace?: MakeRequestEvents<StoreReturnType['useUpdateWorkspace'], StoreParameters['useUpdateWorkspace']>
  useCreateWorkspace?: MakeRequestEvents<StoreReturnType['useCreateWorkspace'], StoreParameters['useCreateWorkspace']>
}
