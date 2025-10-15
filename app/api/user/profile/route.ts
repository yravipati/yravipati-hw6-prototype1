import { NextRequest, NextResponse } from 'next/server';

// In-memory database simulation
let profiles: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { careerInterests, skills, classYear, goals } = body;

    // Validate required fields
    if (!careerInterests || !Array.isArray(careerInterests) || careerInterests.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Career interests are required and must be a non-empty array'
        },
        { status: 400 }
      );
    }

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Skills must be an array'
        },
        { status: 400 }
      );
    }

    if (!classYear) {
      return NextResponse.json(
        {
          success: false,
          message: 'Class year is required'
        },
        { status: 400 }
      );
    }

    if (!goals || !Array.isArray(goals) || goals.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Goals are required and must be a non-empty array'
        },
        { status: 400 }
      );
    }

    // Create profile
    const profileId = 'profile-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const createdAt = new Date().toISOString();
    
    const profile = {
      id: profileId,
      careerInterests,
      skills,
      classYear,
      goals,
      createdAt,
      updatedAt: createdAt
    };

    profiles.push(profile);

    console.log('Profile created:', {
      id: profileId,
      careerInterests,
      skills: skills.length,
      classYear,
      goals
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Profile created successfully',
        profileId: profileId,
        createdAt: createdAt
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error while creating profile'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const profile = profiles.find(p => p.id === id);
      
      if (!profile) {
        return NextResponse.json(
          {
            success: false,
            message: 'Profile not found'
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        profile
      });
    }

    // Return all profiles
    return NextResponse.json({
      success: true,
      profiles: profiles,
      total: profiles.length
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error while fetching profile'
      },
      { status: 500 }
    );
  }
}

