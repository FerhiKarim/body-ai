import { MaterialIcons } from '@expo/vector-icons';
import { Box, HStack, Icon, Pressable, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { ScrollView, Text } from 'react-native';

const AdminDashboard = () => {
  const menuItems = [
    { title: 'Dashboard', icon: 'dashboard' },
    { title: 'Users', icon: 'people' },
    { title: 'Settings', icon: 'settings' },
  ];

  return (
    <Box flex={1} bg="$backgroundLight50">
      <HStack flex={1}>
        {/* Sidebar */}
        <Box
          w="$64"
          bg="$backgroundLight100"
          borderRightWidth={1}
          borderRightColor="$borderLight200"
          py="$4"
        >
          <VStack space="md">
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                px="$4"
                py="$2"
                _hover={{ bg: '$backgroundLight200' }}
              >
                <HStack space="sm" alignItems="center">
                  <Icon
                    as={MaterialIcons}
                    name={item.icon}
                    size="sm"
                    color="$textLight900"
                  />
                  <Text className="text-gray-800">{item.title}</Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} p="$4">
          <ScrollView>
            <VStack space="lg">
              <Text className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </Text>
              
              {/* Stats Cards */}
              <HStack space="md" flexWrap="wrap">
                <Box
                  bg="$backgroundLight50"
                  p="$4"
                  rounded="$lg"
                  borderWidth={1}
                  borderColor="$borderLight200"
                  flex={1}
                  minW="$48"
                >
                  <Text className="text-gray-500">Total Users</Text>
                  <Text className="text-2xl font-bold text-gray-900">0</Text>
                </Box>
                
                <Box
                  bg="$backgroundLight50"
                  p="$4"
                  rounded="$lg"
                  borderWidth={1}
                  borderColor="$borderLight200"
                  flex={1}
                  minW="$48"
                >
                  <Text className="text-gray-500">Active Sessions</Text>
                  <Text className="text-2xl font-bold text-gray-900">0</Text>
                </Box>
              </HStack>

              {/* Recent Activity */}
              <Box
                bg="$backgroundLight50"
                p="$4"
                rounded="$lg"
                borderWidth={1}
                borderColor="$borderLight200"
              >
                <Text className="text-xl font-semibold text-gray-900 mb-4">
                  Recent Activity
                </Text>
                <Text className="text-gray-500">No recent activity</Text>
              </Box>
            </VStack>
          </ScrollView>
        </Box>
      </HStack>
    </Box>
  );
};

export default AdminDashboard; 