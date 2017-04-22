class EventsFetchService
  class FriendsAttendingEvents
    def self.build
      new
    end

    def call(params)
      user_id = params[:user_id]
      friends_attending_events = Event.select("events.*").joins("INNER JOIN event_attendees ON event_attendees.event_id = events.id INNER JOIN follows ON event_attendees.user_id = follows.followable_id").where("follows.follower_id = #{user_id} AND follows.followable_type ='User' AND event_attendees.status IN (1, 2)")
      return friends_attending_events
    end
  end
end
